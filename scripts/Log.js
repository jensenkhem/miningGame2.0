// Class to handle all logging activities
class Log {
    constructor(rows) {
        this.rows = rows;
        for(let i = 0; i < this.rows.length; i++) {
            this.rows[i].innerHTML = "--------------------";
        }
    }
    // Write a new line to the log
    write(line) {
        this.pushDown();
        this.rows[0].innerHTML = line + " - " + formatDate(new Date());
        this.rows[0].style.fontWeight = "bold";
    }
    // Push the elements of the log down one row
    pushDown() {
        let next = ""
        let previous = ""
        for(let i = 0; i < this.rows.length; i++) {
            previous = this.rows[i].innerHTML;
            this.rows[i].innerHTML = next;
            next = previous;
        }
    }
}
