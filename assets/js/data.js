// Datos de producto para pruebas
window.AppData = {
  products:[
    {code:'TC001',category:'Tortas Cuadradas',name:'Torta Cuadrada de Chocolate',price:45000,desc:'Ganache y avellanas. Personalizable.',emoji:'🍫'},
    {code:'TC002',category:'Tortas Cuadradas',name:'Torta Cuadrada de Frutas',price:50000,desc:'Frutas frescas y crema chantilly.',emoji:'🍓'},
    {code:'TT001',category:'Tortas Circulares',name:'Torta Circular de Vainilla',price:40000,desc:'Bizcocho clásico con crema pastelera.',emoji:'🧁'},
    {code:'TT002',category:'Tortas Circulares',name:'Torta Circular de Manjar',price:42000,desc:'Manjar y nueces, tradición chilena.',emoji:'🥮'},
    {code:'PI001',category:'Postres Individuales',name:'Mousse de Chocolate',price:5000,desc:'Cremoso y suave.',emoji:'🍮'},
    {code:'PI002',category:'Postres Individuales',name:'Tiramisú Clásico',price:5500,desc:'Café, mascarpone y cacao.',emoji:'☕'},
    {code:'PSA001',category:'Productos Sin Azúcar',name:'Torta Sin Azúcar de Naranja',price:48000,desc:'Endulzada naturalmente.',emoji:'🍊'},
    {code:'PSA002',category:'Productos Sin Azúcar',name:'Cheesecake Sin Azúcar',price:47000,desc:'Suave y cremoso.',emoji:'🧀'},
    {code:'PT001',category:'Pastelería Tradicional',name:'Empanada de Manzana',price:3000,desc:'Rellena de manzanas especiadas.',emoji:'🥟'},
    {code:'PT002',category:'Pastelería Tradicional',name:'Tarta de Santiago',price:6000,desc:'Almendras, azúcar y huevos.',emoji:'🥧'},
    {code:'PG001',category:'Productos Sin Gluten',name:'Brownie Sin Gluten',price:4000,desc:'Rico y denso.',emoji:'🍫'},
    {code:'PG002',category:'Productos Sin Gluten',name:'Pan Sin Gluten',price:3500,desc:'Suave y esponjoso.',emoji:'🍞'},
    {code:'PV001',category:'Productos Vegana',name:'Torta Vegana de Chocolate',price:50000,desc:'Sin productos de origen animal.',emoji:'🌱'},
    {code:'PV002',category:'Productos Vegana',name:'Galletas Veganas de Avena',price:4500,desc:'Crujientes y sabrosas.',emoji:'🍪'},
    {code:'TE001',category:'Tortas Especiales',name:'Torta Especial de Cumpleaños',price:55000,desc:'Personalizable para tu fiesta.',emoji:'🎂'},
    {code:'TE002',category:'Tortas Especiales',name:'Torta Especial de Boda',price:60000,desc:'Elegante para el gran día.',emoji:'💍'}
  ],
  users:[
    {name:'Ana Pérez',email:'ana@duoc.cl',role:'admin',birthdate:'1970-05-10',benefits:['DUOC','>50']},
    {name:'Luis Gómez',email:'luis@example.com',role:'user',birthdate:'1999-09-01',benefits:[]},
    {name:'María Soto',email:'maria@duoc.cl',role:'user',birthdate:'2003-01-15',benefits:['DUOC']},
    {name:'Carlos Ruiz',email:'carlos@example.com',role:'user',birthdate:'1965-12-20',benefits:['>50']},
    {name:'Admin Demo',email:'admin@example.com',role:'admin',birthdate:'1986-07-07',benefits:['FELICES50']}
  ],
  orders:[
    {code:'PED-0001',status:'Preparación',items:[{code:'TC001',qty:1}],total:45000},
    {code:'PED-0002',status:'En reparto',items:[{code:'TT002',qty:1},{code:'PI001',qty:2}],total:52000},
    {code:'PED-0003',status:'Entregado',items:[{code:'PV001',qty:1}],total:50000}
  ]
};
