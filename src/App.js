import { useLocation, useHistory, Route, Switch } from "react-router-dom";
import { Flipper, Flipped, spring } from "react-flip-toolkit";
import "./index.css";

const onAppear = (el) => {
  el.style.opacity = 1;
  spring({
    onUpdate: (val) => {
      el.style.transform = `translateX(${(1 - val) * 100}%)`;
    },
  });
};

const onExit = (el, index, removeElement) => {
  spring({
    onUpdate: (val) => (el.style.transform = `translateX(${-val * 100}%)`),
    onComplete: removeElement,
  });
};

const Page1 = () => {
  return (
    <Flipped onAppear={onAppear} onExit={onExit} flipId={Date.now()}>
      <div style={{ width: "100%", height: "100vh", background: "rebeccapurple" }}></div>
    </Flipped>
  );
};

const Page2 = () => {
  return (
    <Flipped onAppear={onAppear} onExit={onExit} flipId={Date.now()}>
      <div style={{ width: "100%", height: "100vh", background: "deeppink" }}></div>
    </Flipped>
  );
};

const Page3 = () => {
  return (
    <Flipped onAppear={onAppear} onExit={onExit} flipId={Date.now()}>
      <div style={{ width: "100%", height: "100vh", background: "deepskyblue" }}></div>
    </Flipped>
  );
};

function App() {
  const history = useHistory();
  const location = useLocation();

  return (
    <div style={{ width: "100%", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          maxWidth: "300px",
          position: "absolute",
          left: 0,
          right: 0,
          margin: "auto",
          top: "10px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 30,
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <div onClick={() => history.push("/page1")}>Page 1</div>
        <div onClick={() => history.push("/page2")}>Page 2</div>
        <div onClick={() => history.push("/page3")}>Page 3</div>
      </div>
      <Flipper
        flipKey={location.pathname}
        handleEnterUpdateDelete={({ animateExitingElements, animateEnteringElements }) => {
          animateExitingElements();
          animateEnteringElements();
        }}
      >
        <Switch>
          <Route exact path="/" component={Page1}></Route>
          <Route exact path="/page1" component={Page1}></Route>
          <Route exact path="/page2" component={Page2}></Route>
          <Route exact path="/page3" component={Page3}></Route>
        </Switch>
      </Flipper>
    </div>
  );
}

export default App;
