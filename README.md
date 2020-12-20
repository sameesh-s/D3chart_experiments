Here are my experiments in D3.js starting from scratch

---

emmet help link

```
https://code.visualstudio.com/docs/editor/emmet
```

cheat sheet

```
https://docs.emmet.io/cheat-sheet/
```

Setting up chart

---

- a x axis
- a y axis  
  Accessor functions convert one single data point into metric value.  
  yAccessor take data point and return one y axis value.

```
const yAccessor =  d => d.temperatureMax ;
```

Drawing our chart

---

Diemensions we need to define: The wrapper and the bounds.
In SVG instead of background, border we need to use fill and stroke.
Drawing the axis :
