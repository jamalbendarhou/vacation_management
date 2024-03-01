import Card from "@components/dashboard/Card";


export default function Home() {
  return (
    <>
        <main className="ml-60 pt-16 max-h-screen overflow-auto ">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 mb-5 border-gray-800 border-1 shadow-md">
                <h1 className="text-xl font-bold mb-10">Vous pouvez gerer tous vos employes ici</h1>


                <hr className="my-10"/>

                <div className="grid grid-cols-2 gap-5">
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                </div>
              </div>
            </div>
          </div>
        </main>
    </>
  );
}
