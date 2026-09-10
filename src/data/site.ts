// Where the site lives. Change these two lines (and nothing else) if the site moves
// to the apex domain kg-1510.github.io.
export const site = {
  origin: "https://kg-1510.github.io",
  base: "/Portfolio-Website/",
  repo: "https://github.com/KG-1510/Portfolio-Website",
  get url() {
    return `${this.origin}${this.base}`;
  },
};
