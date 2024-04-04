class Log {
    constructor(rows) {
        this.rows = rows;
        for(let i = 0; i < this.rows.length - 1; i++) {
            this.rows[i].innerHTML = "";
        }
    }
    write(line) {
        // Want to push the existing contents of the top row to the next row, and so on...., and overwrite the top with line
        this.pushDown();
        this.rows[0].innerHTML = line + " - " + formatDate(new Date());
        this.rows[0].style.fontWeight = "bold";
    }
    pushDown() {
        let next = ""
        let previous = ""
        for(let i = 0; i < this.rows.length - 1; i++) {
            previous = this.rows[i].innerHTML;
            this.rows[i].innerHTML = next;
            next = previous;
        }
    }
}
