import Image from "next/image";
import {MoveRight, MoveUpRight} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden items-center justify-between font-bold text-center mt-22 px-4 md:px-0">
      <div className="flex flex-col items-start order-2 md:order-1 w-full md:w-auto">
        <div className="flex items-center mb-6 md:mb-10 justify-center gap-4 text-lg md:text-xl">
          <span className="h-1 w-8 md:w-10 bg-(--primary)"/>
          <h1 className="text-(--primary)">CAFÉ DE SPÉCIALITÉ</h1>
        </div>
        <div className="ml-0 md:ml-12 text-start max-w-full md:max-w-[500px]">
          <h1 className="text-3xl md:text-6xl leading-tight">Le café qui mérite votre <span className="text-(--primary)">attention.</span></h1>
          <p className="mt-6 md:mt-8 font-normal text-gray-500 text-sm md:text-base">Grains soigneusement sélectionnés, torréfaction artisanale, livrés directement chez vous. Chaque tasse raconte une origine. </p>
        </div>
        <div className="mt-8 md:mt-12 ml-0 md:ml-12 flex flex-col sm:flex-row gap-4 md:gap-6">
          <Link href="/catalogue">
            <button className="flex items-center justify-center border border-black/40 cursor-pointer hover:-translate-y-2 duration-500 rounded-xl py-2 px-4 text-sm md:text-base">
              Découvrir le catalogue
              <MoveRight className="ml-2" size={18} />
            </button>
          </Link>
          <Link href="/notre-histoire">
            <button className="flex items-center justify-center bg-(--primary) text-white cursor-pointer hover:-translate-y-2 duration-500 rounded-xl py-2 px-4 text-sm md:text-base">
              Notre histoire
              <MoveUpRight className="ml-2" size={18} />
            </button>
          </Link>
        </div>
        <span className="block w-full md:w-[500px] h-[1px] mt-6 md:mt-8 ml-0 md:ml-12 bg-gray-300"></span>
        <div className="flex flex-wrap gap-6 md:gap-10 ml-0 md:ml-12 mt-4 justify-center md:justify-start">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl">12+</h1>
            <p className="text-[12px] font-normal text-gray-600">Origines</p>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl">4.9</h1>
            <p className="text-[12px] font-normal text-gray-600">Note moyenne</p>
          </div>
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl">2400</h1>
            <p className="text-[12px] font-normal text-gray-600">Clients satisfaits</p>
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2 mb-8 md:mb-0">
        <Image
          src="/images/Hero.webp"
          alt="Hero image"
          width={500}
          height={500}
          className="rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg"
        />
      </div>
    </div>
  );
}
