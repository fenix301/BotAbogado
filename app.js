const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
 require('dotenv').config();
 
 const QRPortalWeb = require('@bot-whatsapp/portal')
 const BaileysProvider = require('@bot-whatsapp/provider/baileys')
 const MongoAdapter = require('@bot-whatsapp/database/mongo')
 
 
 const flowGracias = addKeyword(['Gracias','gracias', 'grac']).addAnswer(
     [
         'A ti por comunicarte con nosotros, y recuerda que estamos para servirte 🫱🏼‍🫲🏻',
     ],
     null,
     null,
 )
 
 const flowAsesoria = addKeyword(['1']).addAnswer(
    [
      'Por favor indícame tu nombre y el motivo de tu consulta lo más precisa posible para que en la brevedad del tiempo sea resuelta.',
    ],
    { capture: true },
    async (ctx, { flowDynamic }) => {
      // ctx.body contiene la respuesta del usuario
      const respuestaUsuario = ctx.body;
      // Dividimos la respuesta para obtener el nombre (asumiendo que el nombre está al principio)
      const nombre = respuestaUsuario.split(' ')[0]; // Tomamos la primera palabra como el nombre
  
      // Enviamos el mensaje de agradecimiento con el nombre
      await flowDynamic(`Muchas gracias ${nombre} por comunicarte, por favor esperar y en la menor brevedad de tiempo posible me comunicare contigo.`);
    }
  );
 
 const flowEstado = addKeyword(['2']).addAnswer(
     [
         'Por favor indícame tu nombre y en la brevedad del tiempo me comunicare contigo para compartir el informe respectivo.',
     ],
     { capture: true },
    async (ctx, { flowDynamic }) => {
      // ctx.body contiene la respuesta del usuario
      const respuestaUsuario = ctx.body;
      // Dividimos la respuesta para obtener el nombre (asumiendo que el nombre está al principio)
      const nombre = respuestaUsuario.split(' ')[0]; // Tomamos la primera palabra como el nombre
  
      // Enviamos el mensaje de agradecimiento con el nombre
      await flowDynamic(`Muchas gracias ${nombre} por comunicarte, por favor esperar y en la menor brevedad de tiempo posible me comunicare contigo.`);
    }
 )
 
 const flowDireccion = addKeyword(['3']).addAnswer(
     [
         'Estamos ubicados en el barrio laureles, en el tercer piso de la notaría Sexta de Medellín en la Circular 4A #73-95; la atención es con cita previa. https://maps.app.goo.gl/GDb884K1gDYKJK838',
     ],
     null,
     null,
 )
 
 const flowWeb = addKeyword(['4']).addAnswer(
     [
         'Puedes saber más acerca de nosotros en la dirección electrónica www.vascorios.com y  www.suasesorlegal.com',
     ],
     null,
     null,
 )
 
 
 const flowPrincipal = addKeyword(['Hol','hol','hola','ole', 'alo','Hola','Menú','menú','Menu','menu','buenos d','Buenos d','buenas t','Buenas t','buen d','Buen d','buenas n','Buenas n','buenas','Buenas'])
     .addAnswer(
         [
             'Buen día, te has comunicado con la oficina de *Andrés Vasco Abogado Especialista en Responsabilidad Civil*.',
             '\n Marca el numero de la opción: ',
             '👉 *1.* Para asesoría jurídica.',
             '👉 *2.* Para consultar el estado de tu proceso o tramite.',
             '👉 *3.* Para consultar la dirección de la oficina.',
             '👉 *4.* Para consultar la página web.',
             '\n    👋🏽Siempre puedes escribir menú para volver al menú principal ',
             '\nSi tu comunicación no tiene relación con las opciones anteriores, indícame tu nombre y el motivo de tu consulta, por favor esperar y en la menor brevedad de tiempo posible me comunicare contigo.  ',
         ],
         null,
         null,
         [flowAsesoria,flowEstado,flowDireccion,flowWeb]
     )
 
 const main = async () => {
     const adapterDB = new MongoAdapter({
         dbUri: process.env.MONGO_DB_URI,
         dbName: "Pruebas"
     })
     const adapterFlow = createFlow([flowPrincipal, flowGracias])
     const adapterProvider = createProvider(BaileysProvider)
 
     createBot({
         flow: adapterFlow,
         provider: adapterProvider,
         database: adapterDB,
     })
 
     QRPortalWeb()
 }
 
 main()