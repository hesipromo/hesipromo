import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";
import Header from "./Header";

let isMobile = false;
enquireScreen(b => {
  isMobile = b;
});

class Home extends React.PureComponent {
  state = {
    isFirstScreen: true,
    isMobile
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b
      });
    });
  }

  onEnterChange = mode => {
    this.setState({
      isFirstScreen: mode === "enter"
    });
  };
  render() {
    return [
      <Header
        key="header"
        isFirstScreen={this.state.isFirstScreen}
        isMobile={this.state.isMobile}
      />
    ];
  }
}
export default Home;
