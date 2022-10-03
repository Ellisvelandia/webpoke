import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Home({ styles, pokeData }) {
  const [pokeArr, setPokeArr] = useState(pokeData.slice(0,20));
  console.log(pokeArr);
  return (
    <Layout title={"WebPokedex"}>
      <div className="flex flex-wrap justify-center mx-auto">
        {pokeArr.map((pokeman, i) => {
          return (
            <div key={pokeman.name.english} className="p-4">
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
                        style={{backgroundColor:styles[type.toLowerCase()]}}>{type}</span>
                    )
                  })
                }
                </div>
                <p className="text-center">
                  <p className="font-semibold text-3xl mr-2">{`${pokeman.id}.`}</p>
                  <p className="text-3xl">{pokeman.name.english}</p>
                </p>
              </div>
            </div>
          );
        })}
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
