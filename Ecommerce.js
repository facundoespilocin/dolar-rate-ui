InTechLabor

1. Commons:
	1.1. Menu lateral ubicado a la izquierda con los items de menu disponibles para ese User, segun el Rol que tiene asignado.
	1.2. Footer con la información del sitio.

2. Home
	2.1. Postulantes
		2.1.1. Visualizarán sus Postulaciones activas. 
		2.1.2. A partir de una elipsis de cada Postulacion, representada por una card, podran habilitar/deshabilitar las Notificaciones de cada Postulacion.
		2.1.3. Visualizacion de las Postulaciones activas de los demas Postulantes.
		2.1.4. Visualizacion de las Vacantes que posee +1 de las Skills que posee el Postulante.
		2.1.5. 
3. Entidades
	3.1. Users
		Id
		Name
		LastName
		BirthDate
		Email
		Password
		Country
		CellPhone
		ExperiencieYears
		Profile
	3.2. Postulations
		Id
		UserId
		Description
		Likes
		DueDate
		CreatedDateTime
	3.3. PostulationsUsers
		Id
		UserId
		PostulationId
		