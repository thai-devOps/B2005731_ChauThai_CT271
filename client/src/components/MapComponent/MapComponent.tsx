import React from 'react'

const MapComponent = () => {
  return (
    <div className='mapouter'>
      <div className='gmap_canvas'>
        <iframe
          src='https://maps.google.com/maps?q=%C4%90%E1%BA%A1i%20H%E1%BB%8Dc%20C%E1%BA%A7n%20Th%C6%A1&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed'
          frameBorder='0'
          scrolling='no'
          style={{ width: '1080px', height: '500px' }}
        ></iframe>
        <style>
          {`
            .mapouter {
              position: relative;
              height: 500px;
              width: 1080px;
              background: #fff;
            }
            .maprouter a {
              color: #fff !important;
              position: absolute !important;
              top: 0 !important;
              z-index: 0 !important;
            }
            .gmap_canvas {
              overflow: hidden;
              height: 500px;
              width: 1080px;
            }
            .gmap_canvas iframe {
              position: relative;
              z-index: 2;
            }
          `}
        </style>
        <a href='https://blooketjoin.org'>blooket join</a>
        <style>
          {`
            .gmap_canvas {
              overflow: hidden;
              height: 500px;
              width: 1080px;
            }
            .gmap_canvas iframe {
              position: relative;
              z-index: 2;
            }
          `}
        </style>
      </div>
    </div>
  )
}

export default MapComponent
