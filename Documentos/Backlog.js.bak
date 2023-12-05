1. Carts (Id, CustomerId, ProductId, Uri)
	1.1. Guardar y recuperar carros de todos los estados
	1.2. Al comenzar un proceso de compra, crear un Cart en estado Abandoned y al insertar items a ese Cart, actualizarlo
		1.2.1. Si el cliente no termina su compra, al abandonar la plataforma, se debe crear un registro en la tabla Carts
			1.2.2.1. Almacenar los datos de ese Cart en localStorage
		1.2.2. Si el cliente regresa, es necesario recuperar ese Cart desde localStorage y renderizarlo
		1.2.3. Si el cliente termina su compra, actualizar el estado de ese Cart a Finished y remover ese elemento del localStorage

2. Database:
	2.1. Modificar schema para convertirlo en multi-organizations (New attrs: BusinessName, CUIT, RUT, CBU)
		2.1.1. Al onbordear una Organization, se debe crear el registro en la tabla Organizations y asignarle un valor a la columna DatabaseId.
			2.1.1.1. El valor de la columna DatabaseId se debe generar teniendo en cuenta algun algoritmo que genere un sufijo aleatorio para todos los registros

3. Deployment:
	3.1. Diseñar ambientes de testing y development
		3.1.1. Definir fecha de despliegue en ambiente de testing

4. Sales Process
	4.1. ProductDetail
		4.1.1. Vista con la descripcion completa del Product
			4.1.1.1. Servicio GET_ProductDetail(organizationId, productId)
		4.2.2. Botones:
			4.2.2.1. Agregar al Cart (localStorage)
			4.2.2.1. Mostrar notificacion en la esquina superior derecha 
				4.2.2.1. Mostrar el contenido de "Sales Process/Imagen 1"
				4.2.2.1. El boton Ver Carrito redirecciona a checkout/guid
		4.2.3. Carousel de las Imagenes del Product (estaticas)
		4.2.4. Fila-Carousel con 10 productos relacionados // (extra)
	4.2. SummaryPurchase (www.basepath.com/checkout/guid)
		4.2.1. Vista con todo los elementos del Cart
			4.2.1.1. Mostrar el contenido de "Sales Process/Imagen 2"
				4.2.1.1.1. Cambiar label "Iniciar compra" => "Comprar"
			4.2.1.2. Servicio GET_CartDetail(organizationId, cartId [desde el localStorage])
		4.2.2. Input para ingresar cupon de descuento // (extra)
			4.2.2.1. Servicio GET_CouponByCode(organizationId, couponCode) // (extra)
	4.3. AddressAndContactData
		4.3.1. Vista con todos los datos de la direccion de envio y de contacto
		4.3.2. Validar si el usuario esta logueado
			4.3.2.1. Si esta logueado, autocompletar campos
				4.3.2.1.1. Servicio GET_UserData
			4.3.2.2. Si no esta logueado, mostrar formulario para ingresar datos de la direccion de contacto y envio
			4.3.2.2. Link a Correo Argentino para consultar el CP // (extra)
		4.3.3. Mostrar costos de envio
			4.3.3.1. Servicio GET_ShippingMethods(organizationId, cityId)
				4.3.3.1. Devuelve la lista de metodos de envio cargados previamente por el Administrador con su respectivo costos y se visualizan en un desplegable con una flecha hacia abajo // (extra)
				4.3.3.2. Cuando el cliente selecciona su metodo de envio, se oculta el resto de opciones // (extra)
		4.4.4. Boton Pagar
			4.4.4.1. Se deben validar todos los datos ingresados en el formulario