import MainLayout from '../Layouts/MainLayout';
import Filter from '../components/Home/Filter';

function Home(): JSX.Element {
  return (
    <>
      <div className="container mx-auto flex flex-col">
        <Filter />
      </div>
    </>
  );
}

export default Home;
