import React from 'react';
import {
    CellMeasurer,
    CellMeasurerCache,
    createMasonryCellPositioner,
    Masonry,
    AutoSizer,
  } from 'react-virtualized';
//   import ImageMeasurer from 'react-virtualized-image-measurer';
import styled from '@emotion/styled';

// Array of images with captions
const list = [{
    title: 'test 1',
    image: 'https://ae01.alicdn.com/kf/U2a7eb2fad9d84bcab76d6341fccce4ceL.jpg',
}, {
    title: 'test 2',
    image: 'https://ae01.alicdn.com/kf/U62996061867f4edd99d443a357ef733bX.jpg',
}, {
    title: 'test 3',
    image: 'https://ae01.alicdn.com/kf/U2a7eb2fad9d84bcab76d6341fccce4ceL.jpg',
}, {
    title: 'test 4',
    image: 'https://ae01.alicdn.com/kf/U54ab7dc05926451d9a78845dc3d8368bE.jpg',
}];

class ReviewsList extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    
        this._columnCount = 0;
    
        this._cache = new CellMeasurerCache({
          defaultHeight: 250,
          defaultWidth: 200,
          fixedWidth: true,
        });
    
        this.state = {
          columnWidth: 200,
          height: 300,
          gutterSize: 10,
          overscanByPixels: 0,
        };
    
        this._cellRenderer = this._cellRenderer.bind(this);
        this._onResize = this._onResize.bind(this);
        this._renderAutoSizer = this._renderAutoSizer.bind(this);
        this._renderMasonry = this._renderMasonry.bind(this);
        this._setMasonryRef = this._setMasonryRef.bind(this);
    }

    _calculateColumnCount() {
        const {columnWidth, gutterSize} = this.state;
    
        this._columnCount = Math.floor(this._width / (columnWidth + gutterSize));
    }

    _cellRenderer({index, key, parent, style}) {
        const {columnWidth} = this.state;
    
        // const {list} = this.context;
        const datum = list[index];
    
        return (
          <CellMeasurer cache={this._cache} index={index} key={key} parent={parent}>
            <div
              className={styles.Cell}
              style={{
                ...style,
                width: columnWidth,
              }}>
              <div
                style={{
                  backgroundColor: datum.color,
                  borderRadius: '0.5rem',
                  height: datum.size * 3,
                  marginBottom: '0.5rem',
                  width: '100%',
                  fontSize: 20,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {index}
              </div>
              {test}
            </div>
          </CellMeasurer>
        );
      }
    
      _initCellPositioner() {
        if (typeof this._cellPositioner === 'undefined') {
          const {columnWidth, gutterSize} = this.state;
    
          this._cellPositioner = createCellPositioner({
            cellMeasurerCache: this._cache,
            columnCount: this._columnCount,
            columnWidth,
            spacer: gutterSize,
          });
        }
    }

    _onResize({width}) {
        this._width = width;
    
        this._calculateColumnCount();
        this._resetCellPositioner();
        this._masonry.recomputeCellPositions();
      }
    
      _renderAutoSizer({height, scrollTop}) {
        this._height = height;
        this._scrollTop = scrollTop;
    
        const {overscanByPixels} = this.state;
    
        return (
          <AutoSizer
            disableHeight
            height={height}
            onResize={this._onResize}
            overscanByPixels={overscanByPixels}
            scrollTop={this._scrollTop}>
            {this._renderMasonry}
          </AutoSizer>
        );
    }

    _renderMasonry({width}) {
        this._width = width;
    
        this._calculateColumnCount();
        this._initCellPositioner();
    
        const { height, overscanByPixels } = this.state;
    
        return (
          <Masonry
            autoHeight={false}
            cellCount={1000}
            cellMeasurerCache={this._cache}
            cellPositioner={this._cellPositioner}
            cellRenderer={this._cellRenderer}
            height={height}
            overscanByPixels={overscanByPixels}
            ref={this._setMasonryRef}
            scrollTop={this._scrollTop}
            width={width}
          />
        );
    }

    // This is a bit of a hack to simulate newly loaded cells
    _resetList = () => {
        const ROW_HEIGHTS = [25, 50, 75, 100];

        // const {list} = this.context;
        list.forEach(datum => {
            datum.size = ROW_HEIGHTS[Math.floor(Math.random() * ROW_HEIGHTS.length)];
        });

        this._cache.clearAll();
        this._resetCellPositioner();
        this._masonry.clearCellPositions();
    };

    _resetCellPositioner() {
        const {columnWidth, gutterSize} = this.state;

        this._cellPositioner.reset({
        columnCount: this._columnCount,
        columnWidth,
        spacer: gutterSize,
        });
    }

    _setMasonryRef(ref) {
        this._masonry = ref;
    }

    render() {
        const {
            columnWidth,
            height,
            gutterSize,
            overscanByPixels,
        } = this.state;
        const { data } = props;
        const child = this._renderAutoSizer({height});

        return (
            <div style={{
                flex: '1 0 auto',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
            }}>
                <h2>Reviews List</h2>
                {child}
            </div>
        );
    }
}

ReviewsList.defaultProps = {
    elements: [],
};

export default ReviewsList;
