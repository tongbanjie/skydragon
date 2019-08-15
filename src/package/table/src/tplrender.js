export default {
  props: ['data', 'row'],
  render (createElement) {
    // console.log(this.row);
    // this.data[0].context.$scopedSlots.index = this.row;
    // console.log(createElement('div', this.data));
    // return createElement('span', this.data, {
    //   props: {
    //     index: this.row
    //   }
    // });
    this.data[0].context.$slots.index = this.row;
    // console.log(this.data);
    return createElement('span', this.data);
  }
}