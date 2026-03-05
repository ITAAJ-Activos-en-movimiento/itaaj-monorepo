import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ChevronsRight, Facebook, Linkedin, Twitter } from "react-feather";
import styles from "./Post.module.css";
import { getPostBySlugApi, getPostsApi } from "@/services";
import { Metadata } from "next";

const truncateExcerpt = (text: string, limit: number) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + " ...";
  } else {
    return text;
  }
};

function convertDate(fecha: string): string {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const date = new Date(fecha);
  const mes = meses[date.getMonth()];
  const dia = date.getDate();
  const año = date.getFullYear();

  return `${mes} ${dia}, ${año}`;
}

interface Props {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { title, excerpt } = await getPostBySlugApi(params.slug);

  return {
    title: title,
    description: excerpt,
  };
};

const Post = async ({ params }: Props) => {
  const post = await getPostBySlugApi(params.slug);
  const posts = await getPostsApi();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <div className={styles.date}>
            <p>{post.duration} minutos de lectura</p>
            <p>{convertDate(post.createdAt)}</p>
          </div>
          <h1>{post.title}</h1>
          <div className={styles.info}>
            <p>Equipo editorial itaaj</p>
          </div>
        </div>
        <div className={styles.picture}>
          <Image
            src={post.featuredImage}
            layout="fill"
            objectFit="cover"
            alt="Lag"
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.table_contents}>
            <h3>Tabla de contenidos</h3>
            <p>{post.title}</p>
          </div>
          <div className={styles.line}></div>
          <div className={styles.table_contents_two}>
            <h3>Sobre itaajrealty.com</h3>
            <span>
              Revolucionamos los bienes raices en México.
              <strong>Todo lo que necesitas en un solo lugar</strong>
            </span>
            <button>Conoce más</button>
          </div>
        </div>
        <div>
          <div className={styles.content}>
            <p>{post.excerpt}</p>
          </div>
          <h2 className={styles.content}>{post.title}</h2>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.other}>Otros articulos</h2>
        <div className={styles.container_cards}>
          {posts?.map(
            (post: {
              title: string;
              category: string;
              excerpt: string;
              slug: string;
              featuredImage: string;
            }) => (
              <div key={post.slug} className={styles.card}>
                <div className={styles.image}>
                  <Image
                    src={post?.featuredImage}
                    layout="fill"
                    objectFit="cover"
                    alt={post?.title}
                  />
                </div>
                <div>
                  <div className={styles.banner_card}>
                    <h5>{post?.category}</h5>
                    <h3>{truncateExcerpt(post?.title, 10)}</h3>
                    <span>{truncateExcerpt(post?.excerpt, 20)}</span>
                    <Link
                      className={styles.show_more}
                      href={`/blog/${post?.slug}`}
                    >
                      Ver más <ChevronsRight />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
