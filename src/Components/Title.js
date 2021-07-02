// React
import { React, Component } from "react";

// Header Component
class Title extends Component {
  render() {
    return (
      <div className="py-8 pb-10">
        <div className="  text-left flex w-full">
          <h1 className="text-7xl font-bold">{this.props.text}:</h1>
        </div>
        <p className="font-mono pt-6">
          <span className="text-codepink">import</span> &#123; {this.props.text}{" "}
          &#125;
          <span className="text-codepink"> from </span>
          “nathandaven";
        </p>
      </div>
    );
  }
}

export default Title;
