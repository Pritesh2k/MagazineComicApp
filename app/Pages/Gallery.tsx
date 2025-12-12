import React from 'react'
import Masonry from '../../components/Masonry'

function Gallery() {

  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
];

  return (
    <div className="w-full h-full mt-5 flex p-4 flex-col gap-10 rounded-2xl overflow-x-hidden bg-red-500">
      <Masonry items={items}/>
    </div>
  )
}

export default Gallery