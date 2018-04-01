import {
    Component, ElementRef, Input,
    OnDestroy, OnChanges
} from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HelloReact, HelloProps} from './HelloReact';

@Component({
    selector: 'app-react-component',
    template: ''
})
export class ReactComponent implements OnDestroy, OnChanges {
    @Input() children = [];
    @Input() props: HelloProps = null;

    _element: any;
    constructor(elementRef: ElementRef) {
        console.log('ReactComponent ctor');
        console.log(JSON.stringify(this.props));
        this._element = elementRef.nativeElement;
    }

    render() {
        console.log('ReactComponent render');
        console.log(JSON.stringify(this.props));
        ReactDOM.render(React.createElement(HelloReact, this.props),
            this._element);
    }

    ngOnChange(changes) {
        console.log('ngOnChange');
    }

    ngOnChanges(changes: any) {
        console.log('ngOnChanges');
        if (changes.props) {
            // Did props change? If so, rerender.
            this.render();
        }
    }

    ngOnDestroy() {
        console.log('ReactComponent ngOnDestroy');
        ReactDOM.unmountComponentAtNode(this._element);
    }

}
