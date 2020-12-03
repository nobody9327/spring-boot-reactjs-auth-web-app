import React, { Component } from 'react'

export class DemoComponent extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount(){
        console.log(this.demoRef.context);
        this.demoRef.focus();
    }

    handleClick(){
        alert(this.demoRef.value);
    }

    render() {
        return (
            <div>
                <input ref={e => { this.demoRef = e }} />
                <button onClick={this.handleClick}>Click</button>
            </div>
        )
    }
}

export default DemoComponent
