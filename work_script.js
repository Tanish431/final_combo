document.getElementById("G_R").style.display = "none";
document.getElementById("G_Rc").style.display = "none";
document.getElementById("erase").style.display = "none";
document.getElementById("erasec").style.display = "none";
document.getElementById("downloadButton").style.display = "none";
document.getElementById("downloadButtonc").style.display = "none";

const excel_file = document.getElementById('excel_file');
excel_file.addEventListener('change', (event) => {
    if (!['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(event.target.files[0].type)) {
        document.getElementById('excel_data').innerHTML = '<div class="alert alert-danger">Only .xlsx or .xls file format are allowed</div>';
        excel_file.value = '';
        return false;
    }
    var reader = new FileReader();
    reader.readAsArrayBuffer(event.target.files[0]);
    reader.onload = function(event) {
        var data = new Uint8Array(reader.result);
        var work_book = XLSX.read(data, { type: 'array' });
        var sheet_name = work_book.SheetNames;
        var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], { header: 1 });
        if (sheet_data.length > 0) {
            var table_output = '<table class="table table-striped table-bordered" id="myTable" style="padding: 30px">';
            table_output += '<tr style="text-align: center"><th>Serial No.</th>';
            for (var cell = 0; cell < sheet_data[0].length; cell++) {
                table_output += '<th style="text-align: center">' + sheet_data[0][cell] + '</th>';
            }
            table_output += '</tr>';
            for (var row = 1; row < sheet_data.length; row++) {
                table_output += '<tr style="text-align: center"><td>' + row + '</td>';
                for (var cell = 0; cell < sheet_data[row].length; cell++) {
                    table_output += '<td>' + sheet_data[row][cell] + '</td>';
                }
                table_output += '</tr>';
            }
            table_output += '</table>';
            document.getElementById('excel_data').innerHTML = table_output;
        }
        excel_file.value = '';
        addColumns();
    }
    document.getElementById("G_R").style.display = "block";
    document.getElementById("G_Rc").style.display = "inline";
    document.getElementById("erase").style.display = "block";
    document.getElementById("erasec").style.display = "inline";
    document.getElementById("downloadButton").style.display = "block";
    document.getElementById("downloadButtonc").style.display = "inline";
});

function addColumns() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;
    var colCount = table.rows[0].cells.length;
    for (var n = 0; n < 10; n++) {
        for (var i = 0; i < rowCount; i++) {
            var newCell = table.rows[i].insertCell(colCount + n);
        }
    }
    var rowIndex = 0;
    var colIndex_ppw = 6;
    var colIndex_weight = 7;
    var colIndex_ex = 8;
    var colIndex_exw = 9;
    var colIndex_to = 10;
    var colIndex_tow = 11;
    var colIndex_rem = 12;
    var colIndex_mi = 13;
    var colIndex_ma = 14;
    var colIndex_co = 15;
    table.rows[rowIndex].cells[colIndex_ma].innerHTML = "<b>MAX.</b>"
    table.rows[rowIndex].cells[colIndex_mi].innerHTML = "<b>MIN.</b>"
    table.rows[rowIndex].cells[colIndex_co].innerHTML = "<b>COMBO.</b>"
    table.rows[rowIndex].cells[colIndex_ex].innerHTML = "<b>EXTRA NOP</b>"
    table.rows[rowIndex].cells[colIndex_ppw].innerHTML = "<b>PPW (MT)</b>"
    table.rows[rowIndex].cells[colIndex_weight].innerHTML = "<b>TOTAL WEIGHT (MT)</b>"
    table.rows[rowIndex].cells[colIndex_exw].innerHTML = "<b>EXTRA WEIGHT (MT)</b>"
    table.rows[rowIndex].cells[colIndex_to].innerHTML = "<b>SUGGESTED NOP</b>"
    table.rows[rowIndex].cells[colIndex_tow].innerHTML = "<b>SUGGESTED WEIGHT (MT)</b>"
    table.rows[rowIndex].cells[colIndex_rem].innerHTML = "<b>REMARKS </b>"
}

function gres() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;
    var i = 1;
    while (i < rowCount) {
        var row = table.rows[i];
        var thick_val = Number(row.cells[2].textContent);
        var width_val = Number(row.cells[3].textContent);
        var realwidthvalue = Number(row.cells[3].textContent);
        var p = width_val;
        var length_val = Number(row.cells[4].textContent);
        let y = 0;
        var NOP_val = Number(row.cells[5].textContent);
        let s = [];
        var ppw = (thick_val * width_val * length_val * 7.85 * (10 ** -9)).toFixed(3);
        var ppw_space = row.cells[6];
        var wgt_space = row.cells[7];
        var extra_space = row.cells[8];
        var extraw_space = row.cells[9];
        var total_space = row.cells[10];
        var totalw_space = row.cells[11];
        var rem_space = row.cells[12];
        var min_space = row.cells[13];
        var max_space = row.cells[14];
        var combo_space = row.cells[15];
        ppw_space.innerHTML = ppw;
        
        if (thick_val>150){
            wgt_space.innerHTML = "0";
            extra_space.innerHTML = "0";
            extraw_space.innerHTML = "0";
            totalw_space.innerHTML = "0";
            total_space.innerHTML = "0";
            min_space.innerHTML = "0";
            max_space.innerHTML = "0";
            rem_space.innerHTML = "<span style='color:red;font-weight:bold;'>Not Possible</span>";
            combo_space.innerHTML ="0";
            i++
            continue
        }
        
        wgt_space.innerHTML = (ppw * NOP_val).toFixed(3);
        if (width_val < 1800) {
            width_val = width_val * 2;
            s.push("o");
            p = width_val;
        }
        if (width_val > 1200 && width_val < 2550) {
            width_val = width_val + 100;
        } else if (width_val > 2551 && width_val < 2700) {
            width_val = width_val + 110;
        } else if (width_val > 2701 && width_val < 3100) {
            width_val = width_val + 120;
        } else if (width_val > 3101 && width_val < 3500) {
            width_val = width_val + 150;
        } else if (width_val > 3501 && width_val < 3900) {
            width_val = width_val + 180;
        } else if (width_val > 3901 && width_val < 4200) {
            width_val = width_val + 200;
        }
        let max = 0;
        max = Math.floor(38000 / length_val);
        if (thick_val >= 5 && thick_val <= 12) {
            if (p > 2600 && length_val * max > 28000) {
                while (length_val * max > 28000) {
                    max--;
                }
            }
            y = length_val * max + 1400;
        } else if (thick_val > 12 && thick_val <= 13.9) {
            y = length_val * max + 1400;
        } else if (thick_val >= 14 && thick_val <= 39.9) {
            y = length_val * max + 800;
        } else if (thick_val >= 40 && thick_val <= 99.9) {
            y = length_val * max + 400;
        } else if (thick_val >= 100 && thick_val <= 250) {
            y = length_val * max + 200;
        }
        let tot = thick_val * width_val * y * 7.85 * (10 ** -9) * 1.01;
        if (tot > 19.2) {
            while (tot > 19.2) {
                max--;
                if (thick_val >= 5 && thick_val <= 13.9) {
                    y = length_val * max + 1400;
                } else if (thick_val >= 14 && thick_val <= 39.9) {
                    y = length_val * max + 800;
                } else if (thick_val >= 40 && thick_val <= 99.9) {
                    y = length_val * max + 400;
                } else if (thick_val >= 100 && thick_val <= 250) {
                    y = length_val * max + 200;
                }
                tot = thick_val * width_val * y * 7.85 * (10 ** -9) * 1.01;
            }
        }
        //ppw calculation
        let min = max;
        while (tot > 6.9) {
            min--;
            if (thick_val >= 5 && thick_val <= 13.9) {
                y = length_val * min + 1400;
            } else if (thick_val >= 14 && thick_val <= 39.9) {
                y = length_val * min + 800;
            } else if (thick_val >= 40 && thick_val <= 99.9) {
                y = length_val * min + 400;
            } else if (thick_val >= 100 && thick_val <= 250) {
                y = length_val * min + 200;
            }
            tot = thick_val * width_val * y * 7.85 * (10 ** -9) * 1.01;
            if ((tot - 6.9) < 0) {
                min++;
            }
        }
        if (s.length != 0) {
            min = 2 * min;
            max = 2 * max;
        }
        max_space.innerHTML = max;
        min_space.innerHTML = min;
        
        let min_2 = 0;
        let NOP_val_2 = 0;
        let a = [];
        let m = [];
        let c = [];
        while (min_2 < NOP_val) {
            a.push(min);
            min_2 += min;
        }
        while (a[0] <= max) {
            for (const item of a) {
                NOP_val_2 += item;
            }
            if (a[a.length - 1] > max) {
                a.pop();
                a[a.length - 1]++;
            } else if (NOP_val_2 == NOP_val) {
                combo_space.innerHTML = a;
                a.pop();
                a[a.length - 1]++;
                c.push("L");
            } else if (NOP_val_2 < NOP_val) {
                a.push(a[a.length - 1]);
            } else if (NOP_val_2 > NOP_val) {
                a.pop();
                a[a.length - 1]++;
                let dif = NOP_val_2 - NOP_val;
                m.push(dif);
            }
            NOP_val_2 = 0;
            dif = 0;
        }
        
        let exult = Math.min(...m);
        if (c.length == 0) {
            extraw_space.innerHTML = (exult * ppw).toFixed(3);
            extra_space.innerHTML = exult;
            total_space.innerHTML = exult + NOP_val;
            totalw_space.innerHTML = ((exult + NOP_val) * ppw).toFixed(3);
            rem_space.innerHTML = "Extra Required";
            a = [];
            let NOP_val_3 = Number(exult + NOP_val);
            min_2 = 0;
            while (min_2 < NOP_val_3) {
                a.push(min);
                min_2 += min;
            }
            combo_space.innerHTML = a;
        }
        if (c.length != 0) {
            extra_space.innerHTML = "0";
            total_space.innerHTML = NOP_val;
            extraw_space.innerHTML = "0";
            totalw_space.innerHTML = (NOP_val * ppw).toFixed(3);
        }
        if (s.length != 0 && c.length != 0) {
            rem_space.innerHTML = "<span style='font-weight: bold;'>OK with Slit</span>";
        }
        if (s.length != 0 && c.length == 0) {
            rem_space.innerHTML = "<span style='font-weight: bold;'>Ext. with Slit</span>";
        } else if (s.length == 0 && c.length != 0) {
            rem_space.innerHTML = "OK";
        }
        if (ppw >= 17.2) {
                    wgt_space.innerHTML = "0";
                    extra_space.innerHTML = "0";
                    extraw_space.innerHTML = "0";
                    totalw_space.innerHTML = "0";
                    total_space.innerHTML = "0";
                    min_space.innerHTML = "0";
                    max_space.innerHTML = "0";
                    rem_space.innerHTML = "<span style='color:red;font-weight:bold;'>Not Possible</span>";
                    combo_space.innerHTML ="0";;
        }
        
        if (thick_val<=10){
            if (thick_val>=8){
                if (realwidthvalue !=2500 && (length_val!= 6000 || length_val!= 9000 || length_val!= 12000)) {
                    wgt_space.innerHTML = "0";
                    extra_space.innerHTML = "0";
                    extraw_space.innerHTML = "0";
                    totalw_space.innerHTML = "0";
                    total_space.innerHTML = "0";
                    min_space.innerHTML = "0";
                    max_space.innerHTML = "0";
                    rem_space.innerHTML = "<span style='color:red;font-weight:bold;'>Not Possible</span>";
                    combo_space.innerHTML ="0";
                }
            }
            else if (thick_val <8){
                    wgt_space.innerHTML = "0";
                    extra_space.innerHTML = "0";
                    extraw_space.innerHTML = "0";
                    totalw_space.innerHTML = "0";
                    total_space.innerHTML = "0";
                    min_space.innerHTML = "0";
                    max_space.innerHTML = "0";
                    rem_space.innerHTML = "<span style='color:red;font-weight:bold;'>Not Possible</span>";
                    combo_space.innerHTML ="0";
        }}
        if (realwidthvalue <1250 || realwidthvalue >4400){
                    wgt_space.innerHTML = "0";
                    extra_space.innerHTML = "0";
                    extraw_space.innerHTML = "0";
                    totalw_space.innerHTML = "0";
                    total_space.innerHTML = "0";
                    min_space.innerHTML = "0";
                    max_space.innerHTML = "0";
                    rem_space.innerHTML = "<span style='color:red;font-weight:bold;'>Not Possible</span>";
                    combo_space.innerHTML ="0";
        }
        if(length_val < 6000 || length_val > 18000){
                    wgt_space.innerHTML = "0";
                    extra_space.innerHTML = "0";
                    extraw_space.innerHTML = "0";
                    totalw_space.innerHTML = "0";
                    total_space.innerHTML = "0";
                    min_space.innerHTML = "0";
                    max_space.innerHTML = "0";
                    rem_space.innerHTML = "<span style='color:red;font-weight:bold;'>Not Possible</span>";
                    combo_space.innerHTML ="0";
        }
        i++;
    }
}

function erase() {
    window.location.reload();
}

function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    filename = filename ? filename + '.xls' : 'excel_data.xls';
    downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], { type: dataType });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
    }
}
