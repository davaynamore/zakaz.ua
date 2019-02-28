export default class ApiService {

  _apiBase = 'https://staging-stores-api.zakaz.ua/stores/default';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }

  getAllCategories = async () => {
    const res = await this.getResource(`/categories/`);
    return this.transformCategories(res);
  }

  getCategoryProducts = async (id) => {
    const res = await this.getResource(`/categories/${id}/products/`);
    return this.transformProducts(res);
  }

  transformCategories = (data) => {
    return data.map(el => {
      return {
        title: el.title,
        id: el.id
      }
    })
  }

  transformProducts = (data) => {
    return data.results.map(el => {
      const img = el.img.s150x150 || 'https://via.placeholder.com/150/cccccc/ffffff?text=Image+:-)'
      return {
        ean: el.ean,
        img,
        weight: el.weight,
        title: el.title,
        price: el.price,
        category_id: el.category_id
      }
    })
  }

}
