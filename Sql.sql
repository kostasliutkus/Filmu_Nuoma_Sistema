#@(#) script.ddl

DROP TABLE IF EXISTS Filmas_Aktorius;
DROP TABLE IF EXISTS Israsas;
DROP TABLE IF EXISTS Filmo_perziura;
DROP TABLE IF EXISTS Atsiliepimas;
DROP TABLE IF EXISTS Uzsakymas;
DROP TABLE IF EXISTS Filmas;
DROP TABLE IF EXISTS Zanras;
DROP TABLE IF EXISTS Rezisierius;
DROP TABLE IF EXISTS Klientas;
DROP TABLE IF EXISTS Aktorius;

CREATE TABLE Aktorius
(
	id int NOT NULL AUTO_INCREMENT,
	vardas varchar (255) NOT NULL,
	pavarde varchar (255) NOT NULL,
	amzius int,
	spec varchar (255),
	kaskadininkas boolean,
	pilietybe varchar (255),
	PRIMARY KEY(id)
);

CREATE TABLE Klientas
(
	id int NOT NULL AUTO_INCREMENT,
	vardas varchar (255) NOT NULL,
	pavarde varchar (255) NOT NULL,
	tipas varchar (255) NOT NULL,
	kreditas int NOT NULL,
	telefonas varchar (255),
	el_pastas varchar (255),
	twoFactorSecret varchar (255),
	slapyvardis varchar (255) NOT NULL,
	slaptazodis varchar (255) NOT NULL,
	sukurimo_data varchar (255) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Rezisierius
(
	id int NOT NULL AUTO_INCREMENT,
	vardas varchar (255) NOT NULL,
	pavarde varchar (255) NOT NULL,
	populiariausiasias_filmas varchar (255),
	amzius int,
	pirmo_filmo_data date,
	filmu_kiekis int,
	PRIMARY KEY(id)
);

CREATE TABLE Zanras
(
	id_Zanras int NOT NULL AUTO_INCREMENT,
	name varchar (255) NOT NULL,
	PRIMARY KEY(id_Zanras)
);
INSERT INTO Zanras(id_Zanras, name) VALUES('1', 'Veksmo');
INSERT INTO Zanras(id_Zanras, name) VALUES('2', 'Komedija');
INSERT INTO Zanras(id_Zanras, name) VALUES('3', 'Drama');
INSERT INTO Zanras(id_Zanras, name) VALUES('4', 'Siaubo');
INSERT INTO Zanras(id_Zanras, name) VALUES('5', 'Trileris');
INSERT INTO Zanras(id_Zanras, name) VALUES('6', 'Animacija');
INSERT INTO Zanras(id_Zanras, name) VALUES('7', 'Dokumentika');

CREATE TABLE Filmas
(
	id int NOT NULL AUTO_INCREMENT,
	pavadinimas varchar (255) NOT NULL,
	isleidimo_data varchar (255),
	trukme varchar (255),
	rezisierius int,
	amziaus_cenzas varchar (255),
	studija varchar (255),
	kilmes_salis varchar (255),
	Kalba varchar (255),
	subtitrai boolean,
	kaina int NOT NULL,
	Zanras int,
	fk_Rezisieriusid int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(Zanras) REFERENCES Zanras (id_Zanras),
	CONSTRAINT rezisuoja FOREIGN KEY(fk_Rezisieriusid) REFERENCES Rezisierius (id)
);

CREATE TABLE Atsiliepimas
(
	id int NOT NULL AUTO_INCREMENT,
	ivertinimas int,
	aprasymas varchar (255),
	teigiamas int NOT NULL,
	neigiamas int NOT NULL,
	fk_Filmasid int NOT NULL,
	fk_Klientasid int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT priklauso FOREIGN KEY(fk_Filmasid) REFERENCES Filmas (id),
	CONSTRAINT pateikia FOREIGN KEY(fk_Klientasid) REFERENCES Klientas (id)
);

CREATE TABLE Filmo_perziura
(
	ArPatiko boolean NOT NULL,
	perziuros_data date NOT NULL,
	id int NOT NULL AUTO_INCREMENT,
	fk_Filmasid int NOT NULL,
	fk_Klientasid int NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(fk_Filmasid) REFERENCES Filmas (id),
	CONSTRAINT nustato FOREIGN KEY(fk_Klientasid) REFERENCES Klientas (id)
);

CREATE TABLE Uzsakymas
(
	id int NOT NULL AUTO_INCREMENT,
	apmoketas boolean NOT NULL,
	kaina double NOT NULL,
	uzsakymo_data varchar (255) NOT NULL,
	uzsakytas_filmas varchar (255) NOT NULL,
	fk_Filmasid int NOT NULL,
	fk_Klientasid int NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT yra  FOREIGN KEY(fk_Filmasid) REFERENCES Filmas (id),
	CONSTRAINT sukuria FOREIGN KEY(fk_Klientasid) REFERENCES Klientas (id)
);

CREATE TABLE Filmas_Aktorius
(
	fk_Aktoriusid int,
	fk_Filmasid int,
	PRIMARY KEY(fk_Aktoriusid, fk_Filmasid),
	CONSTRAINT turi FOREIGN KEY(fk_Aktoriusid) REFERENCES Aktorius (id)
);

CREATE TABLE Israsas
(
	id int NOT NULL AUTO_INCREMENT,
	pirkejas varchar (255) NOT NULL,
	suma double NOT NULL,
	aprasas varchar (255),
	israso_data varchar (255) NOT NULL,
	suma_zodziais varchar (255) NOT NULL,
	pardavejo_informacija varchar (255) NOT NULL,
	fk_Uzsakymasid int NOT NULL,
	PRIMARY KEY(id),
	UNIQUE(fk_Uzsakymasid),
	CONSTRAINT gali_tureti FOREIGN KEY(fk_Uzsakymasid) REFERENCES Uzsakymas (id)
);