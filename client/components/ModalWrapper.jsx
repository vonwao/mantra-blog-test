import React from 'react';

export default ModalWrapper = (Component) => (
  <span>
          <a style={{'padding-left': '7px', 'padding-right': '7px', }}
             href={'#openModal'}>label</a>
          <div id={'openModal'} className="modalDialog">
            <div><a href="#close" title="Close" className="close" onClick={this.onClose}>X</a>
              <Component {...this.props} />
            </div>
          </div>
        </span>
);

