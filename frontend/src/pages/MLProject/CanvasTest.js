import React, { useEffect, useState } from 'react';
import ReactExport from 'react-export-excel';
import { Tag, Input, Button, message, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { ExcelFile } = ReactExport;
const { ExcelSheet, ExcelColumn } = ExcelFile;

const CanvasTest = props => {
  const { image } = props;
  const [curShape, setCurShape] = useState('');
  const [curShapes, setCurShapes] = useState([]);
  const [init, setinit] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const [edit, setCurEdit] = useState('');

  function draw(shapes) {
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    context.beginPath();
    for (let i = 0; i < shapes.length; i += 1) {
      const r = shapes[i];
      context.lineWidth = 2;
      context.rect(r.x, r.y, r.width, r.height);
      context.strokeStyle = r.stroke;
      context.stroke();
    }
  }

  function inCorners(mx, my, s) {
    const x1 = s.x;
    const x2 = s.x + s.width;
    const y1 = s.y;
    const y2 = s.y + s.height;
    const corners = [
      [x1 - 10, x1 + 10, y1 - 10, y1 + 10],
      [x2 - 10, x2 + 10, y1 - 10, y1 + 10],
      [x1 - 10, x1 + 10, y2 - 10, y2 + 10],
      [x2 - 10, x2 + 10, y2 - 10, y2 + 10],
    ];
    let curCorner = '';
    corners.forEach((corner, idx) => {
      if (mx >= corner[0] && mx <= corner[1] && my >= corner[2] && my <= corner[3]) {
        if (idx === 0) {
          curCorner = 'topLeft';
        } else if (idx === 1) {
          curCorner = 'topRight';
        } else if (idx === 2) {
          curCorner = 'bottomLeft';
        } else {
          curCorner = 'bottomRight';
        }
      }
    });
    return curCorner;
  }

  useEffect(() => {
    if (!init) {
      const canvas = document.getElementById('myCanvas');
      const canvas2 = document.getElementById('myCanvas2');
      const shapes = [];
      const { boxes, captions } = image;
      const boxArr = boxes.split(',');
      const captionsArr = captions.split(',');
      boxArr.forEach((box, idx) => {
        if (box && box.length > 1) {
          const parsedbox = box.substring(1, box.length - 1);
          let points = parsedbox.split(' ');

          points = points.filter(point => {
            return point !== '';
          });
          const x1 = parseInt(points[0], 10);
          const y1 = parseInt(points[1], 10);
          const x2 = parseInt(points[2], 10);
          const y2 = parseInt(points[3], 10);
          if (x2 - x1 > 20 && y2 - y1 > 20) {
            shapes.push({
              x: x1,
              y: y1,
              width: x2 - x1,
              height: y2 - y1,
              isDragging: false,
              isScaling: false,
              stroke: 'red',
              label: captionsArr[idx].split(' ')[0],
            });
          }
        }
      });
      console.log(shapes);
      setCurShapes(shapes);
      if (canvas) {
        var BB = canvas.getBoundingClientRect();
        var offsetX = 52;
        var offsetY = 410;
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        var dragok = false;
        var startX;
        var startY;
        const context = canvas.getContext('2d');
        const context2 = canvas2.getContext('2d');
        canvas.onmousedown = e => {
          // tell the browser we're handling this mouse event
          e.preventDefault();
          e.stopPropagation();

          // get the current mouse position
          var mx = parseInt(e.offsetX);
          var my = parseInt(e.offsetY);

          // test each shape to see if mouse is inside
          dragok = false;
          let selectedShape = '';
          for (var i = 0; i < shapes.length; i++) {
            var s = shapes[i];
            // decide if the shape is a rect or circle

            // test if the mouse is inside this rect
            if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
              // if yes, set that rects isDragging=true
              s.stroke = 'blue';
              selectedShape = s;
              dragok = true;
              const curCorner = inCorners(mx, my, s);
              if (curCorner !== '') {
                s.isScaling = true;
                s.scalingCorner = curCorner;
                console.log(curCorner);
              } else {
                s.isDragging = true;
              }
            } else {
              s.stroke = 'red';
            }
          }
          setCurShape(selectedShape);
          // save the current mouse position
          startX = mx;
          startY = my;
          draw(shapes);
        };
        canvas.onmouseup = e => {
          // tell the browser we're handling this mouse event
          e.preventDefault();
          e.stopPropagation();

          // clear all the dragging flags
          dragok = false;
          for (var i = 0; i < shapes.length; i++) {
            shapes[i].isDragging = false;
            shapes[i].isScaling = false;
          }
        };
        canvas.onmousemove = e => {
          // if we're dragging anything...
          if (dragok) {
            // tell the browser we're handling this mouse event
            e.preventDefault();
            e.stopPropagation();

            // get the current mouse position
            var mx = parseInt(e.offsetX);
            var my = parseInt(e.offsetY);

            // calculate the distance the mouse has moved
            // since the last mousemove
            var dx = mx - startX;
            var dy = my - startY;

            // move each rect that isDragging
            // by the distance the mouse has moved
            // since the last mousemove
            for (var i = 0; i < shapes.length; i++) {
              var s = shapes[i];
              // console.log(dx);
              // console.log(dy);
              if (s.isDragging) {
                s.x += dx;
                s.y += dy;
              } else if (s.isScaling) {
                if (s.scalingCorner === 'topLeft' && s.width - dx > 20 && s.height - dy > 20) {
                  s.x += dx;
                  s.y += dy;
                  s.width -= dx;
                  s.height -= dy;
                } else if (
                  s.scalingCorner === 'topRight' &&
                  s.width + dx > 20 &&
                  s.height - dy > 20
                ) {
                  s.y += dy;
                  s.width += dx;
                  s.height -= dy;
                } else if (
                  s.scalingCorner === 'bottomLeft' &&
                  s.width - dx > 20 &&
                  s.height + dy > 20
                ) {
                  s.x += dx;
                  s.width -= dx;
                  s.height += dy;
                } else if (
                  s.scalingCorner === 'bottomRight' &&
                  s.width + dx > 20 &&
                  s.height + dy > 20
                ) {
                  s.width += dx;
                  s.height += dy;
                }
              }
            }

            // redraw the scene with the new rect positions
            //   context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
            //   const base_image = new Image();
            //   base_image.src =
            //     image?.url;
            //   base_image.onload = function() {
            //     context.drawImage(base_image, 0, 0);
            //   };
            //   context.globalCompositeOperation = 'destination-atop';
            draw(shapes);

            // reset the starting mouse position for the next mousemove
            startX = mx;
            startY = my;
          }
        };

        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context2.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        const base_image = new Image();
        base_image.src = image?.url;
        base_image.onload = function() {
          context2.drawImage(base_image, 0, 0);
        };

        context.globalCompositeOperation = 'destination-atop';
        draw(shapes);
      }
      setinit(true);
    }
  });

  return (
    <>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '14px 10px' }}
      >
        {editLabel ? (
          <Input
            autoFocus
            style={{ width: '400px' }}
            value={edit}
            onChange={e => setCurEdit(e.target.value)}
            onPressEnter={() => {
              curShape.label = edit;
              setCurShapes(curShapes);
              setEditLabel(false);
            }}
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
            <Tag
              style={{ cursor: 'pointer' }}
              color="cyan"
              onClick={() => {
                if (curShape) {
                  setEditLabel(true);
                  setCurEdit(curShape.label);
                }
              }}
            >
              {curShape.label || 'select a detect box'}
            </Tag>
            {curShape && !editLabel && (
              <Button
                icon={<DeleteOutlined />}
                shape="circle"
                size="small"
                onClick={() => {
                  const curIdx = curShapes.findIndex(shape => shape === curShape);
                  console.log(curShapes);
                  curShapes.splice(curIdx, 1);
                  console.log(curShapes);
                  setCurShapes(curShapes);
                  setCurShape('');
                  draw(curShapes);
                }}
                style={{ marginRight: 4 }}
              />
            )}
            {!editLabel && (
              <Button
                icon={<PlusOutlined />}
                shape="circle"
                size="small"
                onClick={async () => {
                  curShapes.forEach(shape => {
                    shape.stroke = 'red';
                  });
                  const newShape = {
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100,
                    isDragging: false,
                    isScaling: false,
                    stroke: 'blue',
                    label: 'New Label',
                  };
                  curShapes.push(newShape);
                  await setCurShape(newShape);
                  setCurShapes(curShapes);
                  draw(curShapes);
                }}
              />
            )}
          </div>
        )}
      </div>
      <canvas id="myCanvas2" height="500px" width="800px" style={{ overflow: 'scroll' }}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <div style={{ height: 0 }}>
        <canvas
          id="myCanvas"
          height="500px"
          width="800px"
          style={{ position: 'relative', top: '-500px', overflow: 'scroll' }}
        >
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '30px 10px' }}
      >
        <Button type="primary" onClick={() => message.success('updated the detection result')}>
          Update
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          onClick={() => {
            const element = document.createElement('a');
            element.setAttribute(
              'href',
              'data:json/plain;charset=utf-8,' +
                encodeURIComponent(JSON.stringify({ boxes: curShapes })),
            );
            element.setAttribute('download', 'result');

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
          }}
        >
          Export JSON Result
        </Button>
        <ExcelFile
          filename="result export"
          element={
            <Button style={{ marginLeft: 8 }}>
              <Typography.Paragraph strong type="secondary" style={{ padding: 0, margin: 0 }}>
                Export Excel Result
              </Typography.Paragraph>
            </Button>
          }
        >
          <ExcelSheet data={curShapes} name="BD_Extract">
            <ExcelColumn label="Label" value={col => col.label} />
            <ExcelColumn label="Box-x-axis" value={col => col.x} />
            <ExcelColumn label="Box-y-axis" value={col => col.y} />
            <ExcelColumn label="Box-width" value={col => col.width} />
            <ExcelColumn label="Box-height" value={col => col.height} />
          </ExcelSheet>
        </ExcelFile>
      </div>
    </>
  );
};

export default CanvasTest;
