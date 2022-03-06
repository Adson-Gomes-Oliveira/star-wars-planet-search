const getPlanetsAndInfo = async () => {
  try {
    const starRequest = await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((data) => data.results);
    return starRequest;
  } catch (error) {
    console.log(error);
  }
};

export default getPlanetsAndInfo;
