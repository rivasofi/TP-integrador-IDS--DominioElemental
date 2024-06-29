--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cartas; Type: TABLE; Schema: public; Owner: natashapetriw
--

CREATE TABLE public.cartas (
    id integer NOT NULL,
    nombre character varying(100),
    elemento character varying(100),
    poder integer
);


ALTER TABLE public.cartas OWNER TO natashapetriw;

--
-- Name: cartas_id_seq; Type: SEQUENCE; Schema: public; Owner: natashapetriw
--

CREATE SEQUENCE public.cartas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cartas_id_seq OWNER TO natashapetriw;

--
-- Name: cartas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: natashapetriw
--

ALTER SEQUENCE public.cartas_id_seq OWNED BY public.cartas.id;


--
-- Name: cartas id; Type: DEFAULT; Schema: public; Owner: natashapetriw
--

ALTER TABLE ONLY public.cartas ALTER COLUMN id SET DEFAULT nextval('public.cartas_id_seq'::regclass);


--
-- Data for Name: cartas; Type: TABLE DATA; Schema: public; Owner: natashapetriw
--

COPY public.cartas (id, nombre, elemento, poder) FROM stdin;
1	emilia mernes	agua	118
2	lady gaga	nieve	119
3	leo mattioli	nieve	70
4	sza	fuego	51
5	sabrina carpenter	fuego	73
6	fito paez	fuego	78
7	olivia rodrigo	tierra	84
8	melanie martinez	fuego	68
9	mariah carey	fuego	62
10	duki	nieve	119
11	nicki nicole	agua	48
12	tini	tierra	48
13	jennie	agua	103
14	itzy	fuego	92
15	rose	tierra	97
16	easter egg enano bostero	nieve	115
17	ricardo fort	nieve	89
18	milky dolly	fuego	56
19	anto pane	nieve	67
20	moria casan	agua	106
21	mirtha legrand	nieve	89
22	pomelo (capusotto)	agua	92
23	pulpo paul	agua	81
24	perra laika	aire	70
25	oveja dolly	aire	115
26	linux pinguino	nieve	68
27	clippy	agua	64
28	octocat (github)	tierra	112
29	gnu pet	tierra	57
30	firefox pet	fuego	65
31	docker whale	agua	104
32	nessie sql	agua	114
33	barbie	nieve	61
34	regina george	agua	45
35	cady heron	nieve	68
36	gretchen wieners	fuego	110
37	karen smith	agua	50
38	janis	agua	97
39	elle woods	nieve	107
40	cher clueless	agua	94
41	thranduil	nieve	48
42	legolas	agua	101
43	gandalf	fuego	97
44	Naruto	tierra	95
45	Sakura	tierra	73
46	aang	aire	46
47	zuko	fuego	64
48	azula	fuego	53
49	katara	agua	88
50	sokka	agua	76
51	suki	tierra	105
52	toph	tierra	67
53	appa	aire	114
54	yue	agua	74
55	korra	agua	48
56	momo	aire	115
57	iroh	fuego	82
58	Steve	tierra	82
59	Creeper	tierra	55
\.


--
-- Name: cartas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: natashapetriw
--

SELECT pg_catalog.setval('public.cartas_id_seq', 59, true);


--
-- Name: cartas cartas_pkey; Type: CONSTRAINT; Schema: public; Owner: natashapetriw
--

ALTER TABLE ONLY public.cartas
    ADD CONSTRAINT cartas_pkey PRIMARY KEY (id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO natashapetriw;


--
-- PostgreSQL database dump complete
--

