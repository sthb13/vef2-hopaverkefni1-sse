-- Lykilorð: "123"
INSERT INTO users (username, password, admin) VALUES ('admin', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', true);

INSERT INTO category (title) VALUES ('Pizze Fritte');
INSERT INTO category (title) VALUES ('PIzze Bianche');
INSERT INTO category (title) VALUES ('Pizze Rosse');
INSERT INTO category (title) VALUES ('Pasta');
INSERT INTO category (title) VALUES ('Drykkir');

INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Marinara',1590,'Tómatsósa, óreganó, hvítlauksolía','todo',3,'2022-03-02 19:54:49.936239+00','2022-03-02 19:54:49.936239+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Margherita',1990,'Tómatsósa, mozzarella, basil','todo',3,'2022-03-02 20:00:11.230532+00','2022-03-02 20:00:11.230532+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Patate',2390,'Kartöflur, mozzarella, óreganó','todo',2,'2022-03-02 20:20:50.742433+00','2022-03-02 20:20:50.742433+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Bianca',2190,'Mozzarella, kirsuberjatómatar, rucola','todo',2,'2022-03-02 20:23:17.903425+00','2022-03-02 20:23:17.903425+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Egidio',2590,'Mozzarella, nautakjöt, rucola, sítrónuolía','todo',2,'2022-03-02 20:25:32.996989+00','2022-03-02 20:25:32.996989+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Pesto',2490,'Heimagert basilpesto, mozzarella, kirsuberjatómatar, parmesan','todo',2,'2022-03-02 20:26:53.022564+00','2022-03-02 20:26:53.022564+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Fritto Verdure',2590,'Djúosteikt Margherita með kúrbít, melanzani, papriku','todo',1,'2022-03-02 20:33:33.51731+00','2022-03-02 20:33:33.51731+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Alici',2190,'Marinara með ansjósum','todo',3,'2022-03-02 19:57:31.266494+00','2022-03-02 19:57:31.266494+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Prosciutto Cotto',2390,'Margherita með skinku','todo',3,'2022-03-02 20:01:18.683233+00','2022-03-02 20:01:18.683233+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Prosciutto Crudo',2590,'Margherita með hráskinku frá Parma','todo',3,'2022-03-02 20:17:13.846662+00','2022-03-02 20:17:13.846662+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Salame',2390,'Margherita með pepperóní','todo',3,'2022-03-02 20:20:50.737733+00','2022-03-02 20:20:50.737733+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Fritto Salame',2390,'Djúpsteikt Margherita með pepperóni','todo',1,'2022-03-02 20:30:52.561248+00','2022-03-02 20:30:52.561248+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Fritto Cotto',2390,'Djúpsteikt Margherita með skinku','todo',1,'2022-03-02 20:34:31.899802+00','2022-03-02 20:34:31.899802+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Lasagne',2890,'Lasagna með Bolognese- og Bechamel sósu','todo',4,'2022-03-02 20:41:44.834129+00','2022-03-02 20:41:44.834129+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Spaghetti Carbonara',2890,'Spaghetti með beikon, rjóma, eggi og svörtum pipar','todo',4,'2022-03-02 20:42:52.845156+00','2022-03-02 20:42:52.845156+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Penne all''arrabiata',2490,'Penne með chilli og tómatsósu','todo',4,'2022-03-02 20:45:34.557959+00','2022-03-02 20:45:34.557959+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Spaghetti Bolognese',2890,'Spaghetti með kjötsósu','todo',4,'2022-03-02 20:44:18.82963+00','2022-03-02 20:44:18.82963+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Penne con verdure',2690,'Penne með grænmeti, sólþurrkaðum tómatum og ólífum','todo',4,'2022-03-02 20:48:57.096183+00','2022-03-02 20:48:57.096183+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Rauðvín hússins',990,'Aglianico, Kampanía, 20cl','todo',5,'2022-03-02 20:52:55.025864+00','2022-03-02 20:52:55.025864+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Hvítvín hússins',990,'Falanghina, Kampanía, 20cl','todo',5,'2022-03-02 20:53:44.034155+00','2022-03-02 20:53:44.034155+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Kranabjór',990,'Egils Gull, 50cl','todo',5,'2022-03-02 20:56:08.782836+00','2022-03-02 20:56:08.782836+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Flöskubjór',1290,'Peroni, 33cl','todo',5,'2022-03-02 20:56:52.090565+00','2022-03-02 20:56:52.090565+00');
