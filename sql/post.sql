-- Lykilorð: "123"
INSERT INTO users (username, password, admin) VALUES ('admin', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii', true);

INSERT INTO users (username, password) VALUES ('user', '$2a$11$pgj3.zySyFOvIQEpD7W6Aund1Tw.BFarXxgLJxLbrzIv/4Nteisii');


INSERT INTO category (title) VALUES ('Pizze Fritte');
INSERT INTO category (title) VALUES ('PIzze Bianche');
INSERT INTO category (title) VALUES ('Pizze Rosse');
INSERT INTO category (title) VALUES ('Pasta');
INSERT INTO category (title) VALUES ('Drykkir');

INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Marinara',1590,'Tómatsósa, óreganó, hvítlauksolía','https://res.cloudinary.com/emh33/image/upload/v1647216331/marinara_zg0gwj.jpg',3,'2022-03-02 19:54:49.936239+00','2022-03-02 19:54:49.936239+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Margherita',1990,'Tómatsósa, mozzarella, basil','https://res.cloudinary.com/emh33/image/upload/v1647216331/margherita_ovll1i.jpg',3,'2022-03-02 20:00:11.230532+00','2022-03-02 20:00:11.230532+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Patate',2390,'Kartöflur, mozzarella, óreganó','https://res.cloudinary.com/emh33/image/upload/v1647216331/patate_w6jgcx.jpg',2,'2022-03-02 20:20:50.742433+00','2022-03-02 20:20:50.742433+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Bianca',2190,'Mozzarella, kirsuberjatómatar, rucola','https://res.cloudinary.com/emh33/image/upload/v1647216331/bianca_hjo6wt.jpg',2,'2022-03-02 20:23:17.903425+00','2022-03-02 20:23:17.903425+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Egidio',2590,'Mozzarella, nautakjöt, rucola, sítrónuolía','https://res.cloudinary.com/emh33/image/upload/v1647216331/egidio_zwzigp.jpg',2,'2022-03-02 20:25:32.996989+00','2022-03-02 20:25:32.996989+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Pesto',2490,'Heimagert basilpesto, mozzarella, kirsuberjatómatar, parmesan','https://res.cloudinary.com/emh33/image/upload/v1647216331/pesto_wvea9l.jpg',2,'2022-03-02 20:26:53.022564+00','2022-03-02 20:26:53.022564+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Fritto Verdure',2590,'Djúosteikt Margherita með kúrbít, melanzani, papriku','https://res.cloudinary.com/emh33/image/upload/v1647216330/fritto-verdure_pnam0g.jpg',1,'2022-03-02 20:33:33.51731+00','2022-03-02 20:33:33.51731+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Alici',2190,'Marinara með ansjósum','https://res.cloudinary.com/emh33/image/upload/v1647216330/alici_awxahc.jpg',3,'2022-03-02 19:57:31.266494+00','2022-03-02 19:57:31.266494+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Prosciutto Cotto',2390,'Margherita með skinku','https://res.cloudinary.com/emh33/image/upload/v1647216331/prosciutto-cotto_gwpcdc.jpg',3,'2022-03-02 20:01:18.683233+00','2022-03-02 20:01:18.683233+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Prosciutto Crudo',2590,'Margherita með hráskinku frá Parma','https://res.cloudinary.com/emh33/image/upload/v1647216331/prosciutto-crudo_binvka.jpg',3,'2022-03-02 20:17:13.846662+00','2022-03-02 20:17:13.846662+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Salame',2390,'Margherita með pepperóní','https://res.cloudinary.com/emh33/image/upload/v1647217198/salame_a4mdaa.jpg',3,'2022-03-02 20:20:50.737733+00','2022-03-02 20:20:50.737733+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Fritto Salame',2390,'Djúpsteikt Margherita með pepperóni','https://res.cloudinary.com/emh33/image/upload/v1647217106/fritto-salame_n8s3cx.jpg',1,'2022-03-02 20:30:52.561248+00','2022-03-02 20:30:52.561248+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Fritto Cotto',2390,'Djúpsteikt Margherita með skinku','https://res.cloudinary.com/emh33/image/upload/v1647217106/fritto-cotto_huxsfz.jpg',1,'2022-03-02 20:34:31.899802+00','2022-03-02 20:34:31.899802+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Lasagne',2890,'Lasagna með Bolognese- og Bechamel sósu','https://res.cloudinary.com/emh33/image/upload/v1647216331/lasagne_mzfmgv.jpg',4,'2022-03-02 20:41:44.834129+00','2022-03-02 20:41:44.834129+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Spaghetti Carbonara',2890,'Spaghetti með beikon, rjóma, eggi og svörtum pipar','https://res.cloudinary.com/emh33/image/upload/v1647216332/spaghetti-carbonara_jjkrfx.jpg',4,'2022-03-02 20:42:52.845156+00','2022-03-02 20:42:52.845156+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Penne all''arrabiata',2490,'Penne með chilli og tómatsósu','https://res.cloudinary.com/emh33/image/upload/v1647216331/penne-all_arrabiata_qoicwt.jpg',4,'2022-03-02 20:45:34.557959+00','2022-03-02 20:45:34.557959+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Spaghetti Bolognese',2890,'Spaghetti með kjötsósu','https://res.cloudinary.com/emh33/image/upload/v1647216331/spaghetti-bolognese_sllsm9.jpg',4,'2022-03-02 20:44:18.82963+00','2022-03-02 20:44:18.82963+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Penne con verdure',2690,'Penne með grænmeti, sólþurrkaðum tómatum og ólífum','https://res.cloudinary.com/emh33/image/upload/v1647216331/penne-con-verdure_ipdo99.jpg',4,'2022-03-02 20:48:57.096183+00','2022-03-02 20:48:57.096183+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Rauðvín hússins',990,'Aglianico, Kampanía, 20cl','https://res.cloudinary.com/emh33/image/upload/v1647216331/red-wine_zbpn8v.jpg',5,'2022-03-02 20:52:55.025864+00','2022-03-02 20:52:55.025864+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Hvítvín hússins',990,'Falanghina, Kampanía, 20cl','https://res.cloudinary.com/emh33/image/upload/v1647216332/white-wine_qezuxm.jpg',5,'2022-03-02 20:53:44.034155+00','2022-03-02 20:53:44.034155+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Kranabjór',990,'Egils Gull, 50cl','https://res.cloudinary.com/emh33/image/upload/v1647216330/beer_b5fytk.jpg',5,'2022-03-02 20:56:08.782836+00','2022-03-02 20:56:08.782836+00');
INSERT INTO products (title,price,description,img,categoryid,created,lastedit) VALUES ('Flöskubjór',1290,'Peroni, 33cl','https://res.cloudinary.com/emh33/image/upload/v1647216331/beer-bottle_ukfy8g.jpg',5,'2022-03-02 20:56:52.090565+00','2022-03-02 20:56:52.090565+00');

INSERT INTO baskets (id,created) VALUES ('c75a4f3c-083d-4805-b6ce-b990d044db47','2022-03-05 22:03:55.801724+00');
INSERT INTO baskets (id,created) VALUES ('f4ddef09-cadb-4472-bfa8-152b250a8496','2022-03-05 22:04:35.254515+00');

INSERT INTO basketitems (productid,basketid,amount) VALUES (1,'c75a4f3c-083d-4805-b6ce-b990d044db47',1);
INSERT INTO basketitems (productid,basketid,amount) VALUES (2,'c75a4f3c-083d-4805-b6ce-b990d044db47',2);
INSERT INTO basketitems (productid,basketid,amount) VALUES (3,'c75a4f3c-083d-4805-b6ce-b990d044db47',1);
INSERT INTO basketitems (productid,basketid,amount) VALUES (5,'f4ddef09-cadb-4472-bfa8-152b250a8496',3);
INSERT INTO basketitems (productid,basketid,amount) VALUES (5,'f4ddef09-cadb-4472-bfa8-152b250a8496',2);
