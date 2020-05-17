import React, { useEffect, useState } from 'react';
import { Tag, Input, Button, message } from 'antd';

const CanvasTest = props => {
  const { image } = props;
  const [curShape, setCurShape] = useState('');
  const [curShapes, setCurShapes] = useState([]);
  const [init, setinit] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const [edit, setCurEdit] = useState('');
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

          shapes.push({
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
            isDragging: false,
            stroke: 'red',
            label: captionsArr[idx].split(' ')[0],
          });
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
          console.log(e.clientX, e.offsetX);
          console.log(e.clientY, e.offsetY);
          // test each shape to see if mouse is inside
          dragok = false;
          for (var i = 0; i < shapes.length; i++) {
            var s = shapes[i];
            // decide if the shape is a rect or circle

            // test if the mouse is inside this rect
            if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
              // if yes, set that rects isDragging=true
              dragok = true;
              s.isDragging = true;
              s.stroke = 'blue';
              setCurShape(s);
            } else {
              s.stroke = 'red';
            }
          }
          // save the current mouse position
          startX = mx;
          startY = my;
          context.beginPath();
          for (let i = 0; i < shapes.length; i += 1) {
            rect(shapes[i]);
          }
        };
        canvas.onmouseup = e => {
          // tell the browser we're handling this mouse event
          e.preventDefault();
          e.stopPropagation();

          // clear all the dragging flags
          dragok = false;
          for (var i = 0; i < shapes.length; i++) {
            shapes[i].isDragging = false;
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
            context.beginPath();

            for (let i = 0; i < shapes.length; i += 1) {
              rect(shapes[i]);
            }

            // reset the starting mouse position for the next mousemove
            startX = mx;
            startY = my;
          }
        };

        // draw a single rect
        function rect(r) {
          context.lineWidth = 4;
          context.rect(r.x, r.y, r.width, r.height);
          context.strokeStyle = r.stroke;
          context.stroke();
        }

        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        context2.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        const base_image = new Image();
        base_image.src = image?.url;
        base_image.onload = function() {
          context2.drawImage(base_image, 0, 0);
        };
        context.beginPath();

        context.globalCompositeOperation = 'destination-atop';
        for (let i = 0; i < shapes.length; i += 1) {
          rect(shapes[i]);
        }
      }
      setinit(true);
    }
  });

  return (
    <>
      <div
        style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '30px 10px' }}
      >
        {editLabel ? (
          <Input
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
          <Tag
            style={{ cursor: 'pointer' }}
            color="cyan"
            onClick={() => {
              setEditLabel(true);
              setCurEdit(curShape.label);
            }}
          >
            {curShape.label || 'select a detect box'}
          </Tag>
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
      </div>
    </>
  );
};

export default CanvasTest;
