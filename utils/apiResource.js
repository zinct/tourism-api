class ApiResource {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const excludeQuery = ["sort", "page", "per_page", "limit", "fields"];
    let newQueryString = { ...this.queryString };

    excludeQuery.forEach((eq) => delete newQueryString[eq]);

    newQueryString = JSON.parse(JSON.stringify(newQueryString).replace(/\b(gte|gt|lte|lt)\b/g, (m) => `$${m}`));
    this.query.find(newQueryString);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      console.log("Sorting...");
      const sorting = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sorting);
    } else this.query = this.query.sort("-createdAt");
    return this;
  }

  fieldsLimit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-__v");
    return this;
  }

  limit() {
    if (this.queryString.limit) this.query = this.query.limit(Number(this.queryString.limit));
    return this;
  }
}

module.exports = ApiResource;
