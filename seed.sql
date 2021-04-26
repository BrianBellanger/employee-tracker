USE employeesDB;

INSERT INTO department (name)
VALUES ("Tobacco & Alcohol Enforcement"), ("JavaScriptyness"), ("Drinking from a Fire Hose"), ("You Should've bought a Mac");

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 60.75, 1), ("Senior", 50.50, 1), ("Junior", 40.25, 1), ("Director", 60.75, 2), ("Senior", 50.50, 2), ("Junior", 40.25, 2), ("Director", 60.75, 3), ("Senior", 50.50, 3), ("Junior", 40.25, 3), ("Director", 60.75, 4), ("Senior", 50.50, 4), ("Junior", 40.25, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lucy", "Lucky", 1, null), ("Needit", "Yesterday", 4, null), ("Justin", "Time", 7, null), ("Collin", "Sick", 10, null), ("Jussay", "Nottin", 2, 1), ("Les", "Pospone", 5, 2), ("Noah", "Whey", 8, 3), ("U.R.", "Kraze", 11, 4), ("Donte", "Knowe", 3, 1), ("Ima", "Quitten", 6, 2), ("Prokras", "Tinate", 9, 3), ("Disdew", "Nguyen", 12, 4), ("Gossie", "Aitch-Arrh", 6, 2), ("Play", "Gerize", 9, 1);