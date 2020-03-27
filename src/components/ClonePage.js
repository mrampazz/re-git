import React from "react";
import Header from "./ui/Header";
import Repo from "./ui/Repo";
import "../assets/components.scss";
import SearchBar from "./ui/SearchBar";
export default class ClonePage extends React.Component {
    render() {
        let array = null;
        if (this.props.repos.length !== 0) {
            array = this.props.repos.map(item => (
                <Repo
                    cssClassCloning={
                        item.isCloning
                            ? "cloning"
                            : ""
                    }
                    cssClassCloned={
                        item.isCloned
                            ? "cloned"
                            : ""
                    }
                    key={item.id}
                    name={item.name}
                    clone={() =>
                        this.props.clone({
                            cloneUrl: item.cloneUrl,
                            name: item.name
                        })
                    }
                />
            ));
        }

        return (
            <div className="page">
                <Header text="Clone a repo" />
                <div className="reposContainer"> {array} </div>
            </div>
        );
    }
}
