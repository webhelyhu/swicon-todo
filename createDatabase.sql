-- SEQUENCE: public.Users_id_seq

-- DROP SEQUENCE public."Users_id_seq";

CREATE SEQUENCE public."Users_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public."Users_id_seq"
    OWNER TO testing;


-- Table: public.Users

-- DROP TABLE public."Users";

CREATE TABLE public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    username character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Users"
    OWNER to testing;

-- SEQUENCE: public.Todos_id_seq

-- DROP SEQUENCE public."Todos_id_seq";

CREATE SEQUENCE public."Todos_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public."Todos_id_seq"
    OWNER TO testing;

-- Table: public.Todos

-- DROP TABLE public."Todos";

CREATE TABLE public."Todos"
(
    id integer NOT NULL DEFAULT nextval('"Todos_id_seq"'::regclass),
    todotitle character varying(255) COLLATE pg_catalog."default",
    todobody character varying(255) COLLATE pg_catalog."default",
    owner integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Todos_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public."Todos"
    OWNER to testing;    