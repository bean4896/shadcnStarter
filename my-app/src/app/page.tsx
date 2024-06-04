'use client'
import Image from "next/image";
import GameList from "./data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Filter from "@/components/Filter";
import { useState } from "react";
interface Game {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  allowCountry: string[];
  category: string;
  tag: string[];
}
export default function Home() {
  const [filteredGames, setFilteredGames] = useState(GameList);
  const [filteredOutGames, setFilteredOutGames] = useState<Game[]>([]);

  const handleFilter = ({ category, tags }: { category: string; tags: string[] }) => {
    let filteredData = GameList.slice();
    let filteredOutData: Game[] = [];

    if (category) {
      filteredData = filteredData.filter((game) => game.category === category);
    }

    if (tags?.length > 0) {
      filteredData = filteredData.filter((game) =>
        tags.some((tag: string) => game.tag.includes(tag))
      );
    }

    filteredOutData = GameList.filter((game) => !filteredData.includes(game));

    setFilteredGames(filteredData);
    setFilteredOutGames(filteredOutData.sort((a, b) => a.name.localeCompare(b.name)));

    console.log(filteredOutData); // Log the filtered out data
  };

  const categories = Array.from(new Set(GameList.map((game) => game.category)));
  const tags = Array.from(new Set(GameList.flatMap((game) => game.tag)));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Filter categories={categories} tags={tags} onFilter={handleFilter} />
      <div className="grid grid-cols-4 gap-16">
        {filteredGames.map((game) => (
          <div key={game.id}>
            <Card>
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.category}</CardDescription>
                <div className="grid grid-cols-4 gap-0">
                  {game.tag.map((tag) => (
                    <div key={tag}>{tag}</div>
                  ))}
                </div>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src={game.thumbnail} alt={game.name} width={500} height={500} />
              </CardContent>
            </Card>
          </div>
        ))}
        {filteredOutGames.map((game) => (
          <div key={game.id}>
            <Card className="greyScale">
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.category}</CardDescription>
                <div className="grid grid-cols-4 gap-0">
                  {game.tag.map((tag) => (
                    <div key={tag}>{tag}</div>
                  ))}
                </div>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image src={game.thumbnail} alt={game.name} width={500} height={500} />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}