function gres() {
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length
    var i = 1
    while (i < rowCount) {
        var rowIndex = i
        var row = table.rows[i]
        var thick_val = Number(row.cells[0].textContent)
        var width_val = Number(row.cells[1].textContent)
        var length_val = Number(row.cells[2].textContent)
        let y = 0
        var NOP_val = Number(row.cells[3].textContent)
        let s = []
        let t = []
        var ppw = (thick_val * width_val * length_val * 7.85 * (10 ** -9)).toFixed(3)
        var ppw_space = row.cells[4]
        ppw_space.innerHTML = ppw
        var wgt_space = row.cells[5]
        wgt_space.innerHTML = (ppw * NOP_val).toFixed(3)
        if (width_val < 1800) {
            width_val = width_val * 2
            s.push("o")
        }
        if (width_val > 1200 && width_val < 2550) {
            width_val = width_val + 100
        } else if (width_val > 2551 && width_val < 2700) {
            width_val = width_val + 110
        } else if (width_val > 2701 && width_val < 3100) {
            width_val = width_val + 120
        } else if (width_val > 3101 && width_val < 3500) {
            width_val = width_val + 150
        } else if (width_val > 3501 && width_val < 3900) {
            width_val = width_val + 180
        } else if (width_val > 3901 && width_val < 4200) {
            width_val = width_val + 200
        }
        let max = 0
        max = Math.floor(38000 / length_val)
        if (thick_val >= 5 && thick_val <= 13.9) {
            y = length_val * max + 1400
        } else if (thick_val >= 14 && thick_val <= 39.9) {
            y = length_val * max + 800
        } else if (thick_val >= 40 && thick_val <= 99.9) {
            y = length_val * max + 400
        } else if (thick_val >= 100 && thick_val <= 250) {
            y = length_val * max + 200
        }
        let tot = thick_val * width_val * y * 7.85 * (10 ** -9) * 1.01
        console.log(tot)
        if (tot > 19.2) {
            while (tot > 19.2) {
                max--
                if (thick_val >= 5 && thick_val <= 13.9) {
                    y = length_val * max + 1400
                } else if (thick_val >= 14 && thick_val <= 39.9) {
                    y = length_val * max + 800
                } else if (thick_val >= 40 && thick_val <= 99.9) {
                    y = length_val * max + 400
                } else if (thick_val >= 100 && thick_val <= 250) {
                    y = length_val * max + 200
                }
                tot = thick_val * width_val * y * 7.85 * (10 ** -9) * 1.01
            }
        }

        let min = max
        while (tot > 6.9) {
            min--
            if (thick_val >= 5 && thick_val <= 13.9) {
                y = length_val * min + 1400
            } else if (thick_val >= 14 && thick_val <= 39.9) {
                y = length_val * min + 800
            } else if (thick_val >= 40 && thick_val <= 99.9) {
                y = length_val * min + 400
            } else if (thick_val >= 100 && thick_val <= 250) {
                y = length_val * min + 200
            }
            tot = thick_val * width_val * y * 7.85 * (10 ** -9) * 1.01
            if ((tot - 6.9) < 0) {
                min++
            }
        }
        if(s.length!=0){
            min=2*min
            max=2*max
        }

        var min_space = row.cells[11]
        min_space.innerHTML = min
        var max_space = row.cells[12]
        max_space.innerHTML = max

        var extra_space = row.cells[6]
        var extraw_space = row.cells[7]
        var total_space = row.cells[8]
        var totalw_space = row.cells[9]
        var rem_space = row.cells[10]
        var combo_space = row.cells[13]

        let min_2 = 0
        let NOP_val_2 = 0
        let a = []
        let m = []
        let c = []
        while (min_2 < NOP_val) {
            a.push(min)
            min_2 += min
        }
        while (a[0] <= max) {
            for (const item of a) {
                NOP_val_2 += item
            }
            if (a[a.length - 1] > max) {
                a.pop()
                a[a.length - 1]++
            }
            else if (NOP_val_2 == NOP_val) {
                combo_space.innerHTML = a
                a.pop()
                a[a.length - 1]++
                c.push("L")
            } else if (NOP_val_2 < NOP_val) {
                a.push(a[a.length - 1])
            } else if (NOP_val_2 > NOP_val) {
                a.pop()
                a[a.length - 1]++
                let dif = NOP_val_2 - NOP_val
                m.push(dif)
            }
            NOP_val_2 = 0
            dif = 0
        }
        
        let exult = Math.min(...m)
        if (c.length == 0) {
            extraw_space.innerHTML = (exult * ppw).toFixed(3)
            extra_space.innerHTML = exult
            total_space.innerHTML = exult + NOP_val
            totalw_space.innerHTML = ((exult + NOP_val) * ppw).toFixed(3)
            rem_space.innerHTML = "Extra Required"
            a = []
            let NOP_val_3 = Number(exult + NOP_val)
            min_2 = 0
            while (min_2 < NOP_val_3) {
                a.push(min)
                min_2 += min
            }
            console.log(a)
            combo_space.innerHTML = a
        }
        if (c.length != 0) {
            extra_space.innerHTML = "-"
            total_space.innerHTML = NOP_val
            extraw_space.innerHTML = "-"
            totalw_space.innerHTML = (NOP_val * ppw).toFixed(3)
        }
        if (s.length != 0 && c.length != 0) {
            rem_space.innerHTML = "OK with Slit"
        }if(s.length != 0 && c.length == 0){
            rem_space.innerHTML = "Ext. with Slit"
        }else if (s.length == 0 && c.length != 0) {
            rem_space.innerHTML = "OK"
        }
        if (ppw >= 17.2) {
            t.push("p")
            wgt_space.innerHTML = "-"
            extra_space.innerHTML = "-"
            extraw_space.innerHTML = "-"
            totalw_space.innerHTML = "-"
            total_space.innerHTML = "-"
            min_space.innerHTML = "-"
            max_space.innerHTML = "-"
            rem_space.innerHTML = "Not Possible"}
        i++
    }
}
var table = document.getElementById("myTable")
var button = document.getElementById("downloadButton");
function erase() {
    window.location.reload()
}
