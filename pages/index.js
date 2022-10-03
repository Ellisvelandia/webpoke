/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Home({ styles, pokeData }) {
  const [pokeArr, setPokeArr] = useState(pokeData.slice(0, 20));
  const [pageno, setPageno] = useState(0);
  // console.log(pokeArr);
  useEffect(() => {
    setPokeArr(pokeData.slice(pageno * 20, pageno * 20 + 20));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageno]);

  const handlePrev = () => {
    setPageno((c) => {
      return c - 1;
    });
  };

  const handleNext = () => {
    setPageno((c) => {
      return c + 1;
    });
  };

  return (
    <Layout title={"WebPokedex"}>
      <div className="container mx-auto flex flex-wrap justify-between mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded disable:bg-gray-700"
          onClick={handlePrev}
          disabled={pageno === 0 ? true : false}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
          onClick={handleNext}
          disabled={pokeData.length / 20 - pageno < 1 ? true : false}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap justify-center mx-auto">
        {pokeArr.map((pokeman, i) => {
          return (
            <div key={pokeman.name.english} className="p-4">
              <Link href={`/pokemons/${pokeman.id}`}><a>
              <div className="bg-gray-200 py-4 px-6 rounded">
                <img
                  src={pokeman.image.hires}
                  alt="pokemon"
                  className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
                />
                <div className="text-center">
                  {pokeman.type.map((type, j) => {
                    return (
                      <span
                        key={type}
                        className="text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                        style={{ backgroundColor: styles[type.toLowerCase()] }}
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>
                <p className="text-center">
                  <span className="font-semibold text-3xl mr-2">{`${pokeman.id}.`}</span>
                  <span className="text-3xl">{pokeman.name.english}</span>
                </p>
              </div> </a></Link>
            </div>
          );
        })}
      </div>
      <div className="container mx-auto flex flex-wrap justify-between mb-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disable:bg-gray-700"
          onClick={handlePrev}
          disabled={pageno === 0 ? true : false}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNext}
          disabled={pokeData.length / 20 - pageno < 1 ? true : false}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await res.json();
    return {
      props: {
        pokeData: data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      },
    };
  } catch (error) {}
}
