-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 15-11-2024 a las 17:27:31
-- Versión del servidor: 8.0.35
-- Versión de PHP: 8.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS raites;
USE raites;
--
-- Base de datos: `raites`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificaciones`
--

CREATE TABLE `calificaciones` (
  `Cal_Id` int NOT NULL,
  `Cal_Calificado_Usu_NUA` int DEFAULT NULL,
  `Cal_Califica_Usu_NUA` int DEFAULT NULL,
  `Cal_Comentario` varchar(100) DEFAULT NULL,
  `Cal_Calificacion` int DEFAULT NULL,
  `Cal_Via_Id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `calificaciones`
--

INSERT INTO `calificaciones` (`Cal_Id`, `Cal_Calificado_Usu_NUA`, `Cal_Califica_Usu_NUA`, `Cal_Comentario`, `Cal_Calificacion`, `Cal_Via_Id`) VALUES
(1, 148101, 280545, '¡Excelente trabajo conduciendo!', 9, 2),
(3, 280545, 783246, 'Felicidades por un viaje tranquilo.', 7, 8),
(5, 783246, 280545, 'Brillante como evito el tráfico.', 9, 10),
(7, 148114, 783246, 'Gran viaje.', 7, 1),
(8, 280545, 148101, '¡Sigue así!', 9, 3),
(11, 148101, 783246, 'Excelente logro.', 9, 18),
(12, 148114, 280545, 'Impresionante trabajo.', 8, 1),
(15, 783246, 148101, '¡Sanos y salvos!', 10, 10),
(17, 369874, 333456, 'Incomodo', 2, 24),
(19, 392293, 392293, 'GOOOOOOODDD', 10, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `Res_Id` int NOT NULL,
  `Res_Usu_NUA` int DEFAULT NULL,
  `Res_via_id` int DEFAULT NULL,
  `Res_Num_Asientos` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`Res_Id`, `Res_Usu_NUA`, `Res_via_id`, `Res_Num_Asientos`) VALUES
(1, 148114, 2, 1),
(2, 148114, 5, 1),
(4, 148114, 7, 2),
(5, 148114, 10, 1),
(6, 148101, 2, 1),
(7, 148101, 7, 2),
(8, 148101, 9, 1),
(10, 148101, 22, 2),
(11, 280545, 1, 1),
(16, 783246, 18, 2),
(17, 783246, 5, 2),
(18, 783246, 9, 2),
(19, 783246, 10, 2),
(20, 783246, 16, 2),
(23, 333456, 23, 1),
(24, 392293, 27, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Usu_NUA` int NOT NULL,
  `Usu_Nombre` varchar(20) NOT NULL,
  `Usu_Apellido_Paterno` varchar(20) NOT NULL,
  `Usu_Apellido_Materno` varchar(20) NOT NULL,
  `Usu_Correo` varchar(100) NOT NULL,
  `Usu_Password` varchar(255) NOT NULL,
  `Usu_Tipo` enum('estudiante_comun','estudiante_con_vehiculo') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Usu_NUA`, `Usu_Nombre`, `Usu_Apellido_Paterno`, `Usu_Apellido_Materno`, `Usu_Correo`, `Usu_Password`, `Usu_Tipo`) VALUES
(148101, 'Jean', 'Garcia', 'Jaime', 'jd.garciajaime@ugto.mx', '$2b$10$6DQYixSxigkg0CpK2alLTOo8pHB0GrEuDB0mUZfMA30/itmBVOlD.', 'estudiante_con_vehiculo'),
(148114, 'Julian', 'Sierra', 'Alvarez', 'julian@ugto.mx', '$2b$10$Bb45IJn/tYJY8SCxWsQf4e75..1eIBTxUjtu/0o17D7HWAuJIxMty', 'estudiante_con_vehiculo'),
(280545, 'Enrique', 'Ortiz', 'Alfaro', 'ea.ortizalfaro@ugto.mx', '$2b$10$3JVogMG7V9X0OQL4vqp/uusnjkHdxG2CnJRfHS8kgXqsZ9rVOUWqq', 'estudiante_con_vehiculo'),
(333456, 'Juan Carlos', 'Martínez', 'Hernandez', 'jc.martinezhernandez@ugto.mx', '$2b$10$OLkCIuteXaiYwvRKP1Kd..bnldhILS5vgOQfOtHn65t65oXvv2CNq', 'estudiante_comun'),
(333999, 'Angela', 'Espinoza', 'Jimenez', 'la.espinozajimenez@ugto.mx', '$2b$10$TuPE0Pmm5CYIE6pUka3rreSNWvrjYS1LMQatsDPHEK2A8S0ksgG/u', 'estudiante_con_vehiculo'),
(369874, 'Fulano Perengano', 'De', 'Tal', 'fp.detal@ugto.mx', '$2b$10$eBv3i1EK3nYI1vKp4nQpq.RfY0vEI/UJxNAaa/2tgId03bq4w6GHO', 'estudiante_con_vehiculo'),
(392293, 'Javier Manuel', 'Matadamas', 'Flores', 'jm.matadamasflores@ugto.mx', '$2b$10$DkW5Q29cJpLxPa/Kw53T7OHaqd18RbghhW2BSThhAATWSlUGZ0Ewy', 'estudiante_con_vehiculo'),
(546329, 'Osvaldo', 'Martinez', 'Gonzalez', 'o.martinezgonzalez@ugto.mx', '$2b$10$3MRWV/FmZqwEV87aKISCpuE4BFKjLq9V50971pjRS8zJYDWTAaZju', 'estudiante_comun'),
(783246, 'Juan', 'Ramirez', 'Garcia', 'ja.ramirezgarcia2@ugto.mx', '$2b$10$uB8JBr/I/YOChXcNCtkuD.H14roI9A83kKhrgTDI7kIIWoDEhI9RG', 'estudiante_con_vehiculo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `Car_id` int NOT NULL,
  `Car_Usu_NUA` int NOT NULL,
  `Car_Modelo` varchar(30) NOT NULL,
  `Car_anio` int NOT NULL,
  `Car_Placas` varchar(20) NOT NULL,
  `Car_Capacidad` int NOT NULL,
  `Car_Color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`Car_id`, `Car_Usu_NUA`, `Car_Modelo`, `Car_anio`, `Car_Placas`, `Car_Capacidad`, `Car_Color`) VALUES
(1, 148114, 'Pickup', 1997, 'Al9-IC-P110', 5, 'Rojo'),
(2, 783246, 'SUV', 1986, 'A3X-MM-C2SU', 4, 'Azul'),
(3, 280545, 'Sedan', 1996, 'X91-KL-28LK', 5, 'Blanco'),
(5, 148101, 'Convertible', 2002, 'X7S-M1-A234', 4, 'Rojo'),
(6, 369874, 'Sedan', 2006, 'GTR-78-9084', 6, 'Rojo'),
(7, 333999, 'Hatchback', 2022, 'gts-32-312', 5, 'Rosa'),
(9, 392293, 'SUV', 2022, 'GRT-40-769', 5, 'Morado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viajes`
--

CREATE TABLE `viajes` (
  `via_Id` int NOT NULL,
  `via_con_usu_NUA` int NOT NULL,
  `via_fecha_hora` datetime NOT NULL,
  `via_origen` varchar(200) NOT NULL,
  `via_destino` varchar(200) NOT NULL,
  `via_lugares_pasada` text,
  `via_esp_disp` int NOT NULL,
  `via_costo` int NOT NULL,
  `via_activo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `viajes`
--

INSERT INTO `viajes` (`via_Id`, `via_con_usu_NUA`, `via_fecha_hora`, `via_origen`, `via_destino`, `via_lugares_pasada`, `via_esp_disp`, `via_costo`, `via_activo`) VALUES
(1, 148114, '2024-02-15 10:30:00', 'Celaya', 'DICIS', NULL, 4, 65, 1),
(2, 148101, '2024-03-10 09:15:00', 'Abasolo', 'DICIS', NULL, 5, 80, 1),
(3, 280545, '2024-04-20 14:30:00', 'Acámbaro', 'DICIS', NULL, 3, 50, 1),
(5, 148101, '2024-04-05 15:30:00', 'Atarjea', 'DICIS', NULL, 7, 100, 1),
(7, 148101, '2024-04-05 15:30:00', 'DICIS', 'Atarjea', NULL, 7, 100, 1),
(8, 280545, '2024-05-10 08:00:00', 'DICIS', 'Celaya', NULL, 8, 120, 1),
(9, 280545, '2024-05-10 08:00:00', 'Celaya', 'DICIS', NULL, 8, 120, 1),
(10, 783246, '2024-05-29 18:45:00', 'DICIS', 'Yuriria', NULL, 1, 30, 1),
(11, 783246, '2024-05-29 08:45:00', 'DICIS', 'Xichú', NULL, 2, 40, 1),
(12, 148114, '2024-05-29 12:45:00', 'Salamanca', 'DICIS', NULL, 1, 30, 1),
(14, 148101, '2024-04-05 15:30:00', 'Atarjea', 'DICIS', NULL, 7, 100, 1),
(15, 280545, '2024-05-10 08:00:00', 'Salamanca', 'DICIS', NULL, 8, 120, 1),
(16, 783246, '2024-06-15 14:20:00', 'DICIS', 'Salamanca', NULL, 5, 80, 1),
(18, 148101, '2024-08-30 17:40:00', 'Guanajuato', 'DICIS', NULL, 2, 40, 1),
(19, 280545, '2024-09-18 12:15:00', 'DICIS', 'Santa Cruz de Juventino Rosas', NULL, 4, 70, 1),
(20, 783246, '2024-10-05 19:55:00', 'DICIS', 'Purísima del Rincón', NULL, 6, 90, 1),
(22, 148101, '2024-12-20 16:00:00', 'Silao', 'DICIS', NULL, 5, 80, 1),
(23, 369874, '2024-06-02 04:00:30', 'GUANAJUATO', 'DICIS', 'Pasando por Irapuato', 4, 100, 1),
(24, 369874, '2024-06-03 07:25:00', 'Centro de Salamanca', 'DICIS', 'Central, Humanista, La Lata', 5, 10, 1),
(25, 369874, '2024-06-06 15:00:00', 'DICIS', 'Irapuato', 'Explanada de DICIS, Pasa afuera de la lata y afuera de la Humanista|', 4, 30, 1),
(26, 369874, '2024-06-05 09:00:00', 'Salamanca', 'DICIS', 'En frente de la cancha \"El Arbol\", afuera del OXXO de la central, afuera de la Humanista', 4, 10, 1),
(27, 392293, '2024-11-24 15:00:00', 'Xichú', 'Acámbaro', 'Central', 4, 200, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD PRIMARY KEY (`Cal_Id`),
  ADD KEY `Cal_Calificado_Usu_NUA` (`Cal_Calificado_Usu_NUA`),
  ADD KEY `Cal_Califica_Usu_NUA` (`Cal_Califica_Usu_NUA`),
  ADD KEY `fk_Cal_Via_Id` (`Cal_Via_Id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`Res_Id`),
  ADD KEY `Res_Usu_NUA` (`Res_Usu_NUA`),
  ADD KEY `Res_via_id` (`Res_via_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Usu_NUA`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`Car_id`),
  ADD KEY `Car_Usu_NUA` (`Car_Usu_NUA`);

--
-- Indices de la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD PRIMARY KEY (`via_Id`),
  ADD KEY `via_con_usu_NUA` (`via_con_usu_NUA`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  MODIFY `Cal_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `Res_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `Car_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `viajes`
--
ALTER TABLE `viajes`
  MODIFY `via_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificaciones`
--
ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`Cal_Calificado_Usu_NUA`) REFERENCES `usuarios` (`Usu_NUA`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`Cal_Califica_Usu_NUA`) REFERENCES `usuarios` (`Usu_NUA`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Cal_Via_Id` FOREIGN KEY (`Cal_Via_Id`) REFERENCES `viajes` (`via_Id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`Res_Usu_NUA`) REFERENCES `usuarios` (`Usu_NUA`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`Res_via_id`) REFERENCES `viajes` (`via_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `vehiculos_ibfk_1` FOREIGN KEY (`Car_Usu_NUA`) REFERENCES `usuarios` (`Usu_NUA`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `viajes`
--
ALTER TABLE `viajes`
  ADD CONSTRAINT `viajes_ibfk_1` FOREIGN KEY (`via_con_usu_NUA`) REFERENCES `usuarios` (`Usu_NUA`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
