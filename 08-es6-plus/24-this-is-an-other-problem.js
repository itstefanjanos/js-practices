function NamedOne(first, last) {
    this.firstName = first;
    this.lastName = last;
    Object.defineProperty(this, 'fullName', {
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(newFullName) {
        [firstName, lastName] = newFullName.split(' ');
        if (firstName !== undefined && lastName !== undefined) {
          [this.firstName, this.lastName] = [firstName, lastName];
        }
      }
    });
}
