const filterList = (data, value) => {
  const filter = value.toLowerCase();

  return data.map((value) => {
    if (value.name.toLowerCase().indexOf(filter) > -1) {
      return value;
    }
  });
};

export default filterList;
