/**
 * Sorts a HTML table
 *
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1; //direction modifier, ?=istrue
    const tBody = table.tBodies[0]; //works only in 1 tbody pages
    const rows = Array.from(tBody.querySelectorAll("tr")); //selecting all rows in table

    //sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    }); //a,b refers to single table row element


    //Remove all existing TRs from the table
    while (tBody.firstChild){
        tBody.removeChild(tBody.firstChild);//remove table row till empty
    }

    //Re-add the newly sorted rows
    tBody.append(...sortedRows);

    //Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));//remove classes that may be previously given
    table.querySelector(`th:nth-child(${column+1})`).classList.toggle("th-sort-asc",asc);//if select header, give th-sort-asc class
    table.querySelector(`th:nth-child(${column+1})`).classList.toggle("th-sort-desc",!asc);

}


document.querySelectorAll(".table-sortable th").forEach(headerCell => { //select all table-sort th
    headerCell.addEventListener("click", () => { //when is clicked
        const tableElement = headerCell.parentElement.parentElement.parentElement; //th needs to refer to table element
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    })
});