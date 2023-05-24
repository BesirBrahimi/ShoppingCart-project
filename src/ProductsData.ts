export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }

  const products = [
    { id: 1, name: 'Macbook Pro 2023',
     description:"The Macbook Pro 2023 is a powerhouse of a laptop that combines cutting-edge technology with sleek design. With its blazing-fast performance, stunning Retina display, and immersive audio, it's the perfect companion for creative professionals and power users. " ,
     price: 1999, image: 'https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/b/mbp14-spacegray-select-202110-removebg-preview.png' },
    { id: 2, name: 'Iphone 14', description:"The iPhone 14 is the latest iteration of Apple's iconic smartphone. With its advanced features and sleek design, it offers an unparalleled user experience. From its stunning Super Retina XDR display to its powerful A-series chip, every aspect of the iPhone 14 is designed to impress." ,price: 999, image: 'https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1638557435572-UYISRNGX323H0CMYA0XM/iPhone+13.png?format=1000w' },
    { id: 3, name: 'Samsung Galaxy S21', description:"The Samsung Galaxy S21 is a flagship smartphone that redefines mobile technology. With its sleek and modern design, powerful processor, and pro-grade camera system, it delivers incredible performance and captures stunning photos and videos. Experience the next level of innovation with the Galaxy S21.", price: 520, image: 'https://cdn1.smartprix.com/rx-ii3Pn8ry8-w280-h280/samsung-galaxy-s21-f.jpg' },
    { id: 4, name: 'Samsung Galaxy Note23',description:"The Samsung Galaxy Note23 is a feature-packed smartphone that combines productivity and entertainment in one device. Its large Infinity Display provides an immersive viewing experience, while the S Pen enables effortless note-taking and creative expression. Get ready to unleash your creativity with the Galaxy Note23." ,price: 1090, image: 'https://rukminim1.flixcart.com/image/312/312/xif0q/mobile/2/s/7/-original-imagmg6gktts6sfy.jpeg?q=70' },
    { id: 5, name: 'Laptop Lenovo - Slim Pro', description:"The Laptop Lenovo - Slim Pro is a versatile and ultra-portable laptop that delivers exceptional performance on the go. With its slim and lightweight design, powerful processor, and long-lasting battery life, it's perfect for professionals and students who need a reliable companion for work and entertainment.", price: 790, image: 'https://s.yimg.com/uu/api/res/1.2/En2vFkJk3De01PtLPdF.MA--~B/Zmk9ZmlsbDtoPTU4Mzt3PTg3NTthcHBpZD15dGFjaHlvbg--/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2023-03/dc345470-ccb4-11ed-ae77-3f52195f2268.cf.jpg' },
    { id: 6, name: 'Solo - Headphones', description:"Immerse yourself in music with Solo Headphones. These sleek and stylish headphones deliver high-quality sound and comfort for an exceptional listening experience. With advanced noise cancellation technology and wireless connectivity, Solo Headphones let you enjoy your favorite music without distractions." ,price: 130, image: 'https://www.energysistem.com/cdnassets/products/45303/front_2000.jpg' },
    { id: 7, name: 'Samsung Galaxy A23', description:"The Samsung Galaxy A23 is a budget-friendly smartphone that doesn't compromise on features. With its large display, reliable performance, and impressive camera capabilities, it offers a great user experience at an affordable price. Stay connected and enjoy all the essential features you need with the Galaxy A23.", price: 299, image: 'https://img.etimg.com/photo/msid-98945513,imgsize-249226/SamsungGalaxyA23.jpg' },
    { id: 8, name: 'Samsung Galaxy S22', description:"The Samsung Galaxy S22 is a flagship smartphone that combines elegant design with powerful performance. With its stunning display, advanced camera system, and seamless multitasking capabilities, it offers a premium user experience. Stay ahead of the curve with the Galaxy S22.", price: 799, image: 'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/samsung/Samsung-Galaxy-S21-FE-5G/Graphite/Samsung-Galaxy-S21-FE-5G-Graphite-thumbnail.png' },
    { id: 9, name: 'Samsung Galaxy A54', description:"The Samsung Galaxy A54 is a stylish and feature-packed smartphone that offers great value for money. With its large AMOLED display, versatile camera setup, and long-lasting battery life, it's designed to meet your everyday needs and keep you connected in style." ,price: 499, image: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1675265562-samsung-galaxy-a14-1675265546.jpg?crop=1xw:1xh;center,top&resize=980:*' },
    { id:10, name: 'Headphones - Borofone', description:"Experience music like never before with Borofone Headphones. These wireless headphones deliver immersive sound quality and a comfortable fit for extended listening sessions. With their sleek design and convenient controls, Borofone Headphones are the perfect companion for music lovers on the move." ,price: 99, image: 'https://www.borofone.com/wp-content/uploads/2022/04/borofone-bo12-power-bt-headset-headphones.jpg' },
    { id:11, name: 'AirPods - Apple',description:" Apple AirPods are the epitome of wireless audio convenience. With their seamless pairing, effortless switching between devices, and high-quality sound, AirPods redefine the way you listen to music and make calls. Enjoy a truly wireless experience with the iconic AirPods.", price: 199, image: 'https://www.thesource.ca/medias/20190326151357-108081543-A.jpg-mediaConversion-640-x-480-0?context=bWFzdGVyfGltYWdlc3wzMzAxMHxpbWFnZS9qcGVnfGltYWdlcy9oZTkvaDNmLzkxNTA3MDcxMzg1OTAuanBnfDgyZDUwOTQ5OTYxNmNjYzIzY2I2Mzk0OGM2NjkwZWU2YjZmNzU4MWRiNjhiOTFlOWMzODM4OGY2NjM5NDNkMzY' },
    { id:12, name: 'Gaming PCs', description:"Take your gaming to the next level with a high-performance gaming PC. These powerful machines are built to deliver smooth gameplay, realistic graphics, and lightning-fast response times" ,price: 1099, image: 'https://media.4rgos.it/s/Argos/2019642_R_SET?w=270&h=270&qlt=75&fmt.jpeg.interlaced=true' },
  ];

  export default products;