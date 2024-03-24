export const getRandomCode: any = () => {
  const letters: string[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
  ];
  const createRandomCode: any = Array.from({ length: 4 }).reduce(
    (acc = "") =>
      acc +
      Math.floor(Math.random() * 6).toString() +
      letters[Math.floor(Math.random() * 14)].toString()
  );

  return createRandomCode.toString();
};
