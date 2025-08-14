// components/BlogPreview.tsx (o LatestNews.tsx)
import React from "react";
import { Newspaper } from "lucide-react";
import { Button } from "././ui/button";
const BlogPreview: React.FC = () => {
  // Datos de ejemplo para las entradas del blog
  const posts = [
    {
      id: 1,
      title: "Guía para comprar tu primer auto usado",
      date: "15 Julio, 2025",
      image: "/assets/blog/noticia1.png", // Asegúrate de tener estas imágenes
      href: "/blog/elegir-auto-usado",
    },
    {
      id: 2,
      title: "¿Cómo elegir el lubricentro adecuado?",
      date: "10 Julio, 2025",
      image: "/assets/blog/noticia2.png", // Asegúrate de tener estas imágenes
      href: "/blog/elegir-lubricentro",
    },
    {
      id: 3,
      title: "Las 5 tecnologías automotrices más innovadoras de 2025",
      date: "01 Julio, 2025",
      image: "/assets/blog/noticia3.png", // Asegúrate de tener estas imágenes
      href: "/blog/tecnologias-automotrices",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Noticias y Consejos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              className="group block bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{post.date}</p>
                <p className="text-gray-600 text-sm">Lee más &rarr;</p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
            <Newspaper className="h-5 w-5 mr-2" /> Ver más artículos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
