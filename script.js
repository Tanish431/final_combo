function gres(){
    var table = document.getElementById("myTable");
    var rowCount = table.rows.length;
    var i=1
    while(i<rowCount){
        var rowIndex = i
        var row = table.rows[i]
        var thick_val = Number(row.cells[0].textContent)
        var width_val = Number(row.cells[1].textContent)
        var length_val = Number(row.cells[2].textContent)
        var NOP_val = Number(row.cells[3].textContent)
        if(width_val<1800){
            width_val=width_val*2
        }
        if(width_val>1200 && width_val<2550){
            width_val=width_val+100
        }else if(width_val>2551 && width_val<2700){
            width_val=width_val+110
        }else if(width_val>2701 && width_val<3100){
            width_val=width_val+120
        }else if(width_val>3101 && width_val<3500){
            width_val=width_val+150
        }else if(width_val>3501 && width_val<3900){
            width_val=width_val+180
        }else if(width_val>3901 && width_val<4200){
            width_val=width_val+200
        }
        var ppw = (thick_val*width_val*length_val*7.85*(10**-9))
        let n = Number(((ppw)*1.1).toFixed(3))
        let min = 0
        if(Math.floor(38000/length_val)*length_val<38001){
            if(Math.floor(38000/length_val)*(n)<6.9){
                min = Math.floor(6.9/(n))
            }else {
                min = Math.floor(6.9/(n))+1
            }
        }
        let max = 0
        let p = 0
        while(p<(38000/length_val)){
            if((n*(min+p))<19.2){
                max=min+p
            }
            p++
        }
        if(max*length_val>38000){
            while(max*length_val>38000){
                max--
            }
        }
        var min_space = row.cells[4]
        min_space.innerHTML=min
        var max_space = row.cells[5]
        max_space.innerHTML=max
        var combo_space = row.cells[6]
        var extra_space = row.cells[7]
        let min_c=min
        let min_2=0
        let NOP_val_2=0
        let a=[]
        let b=[]
        let m=[]
        let c=[]
        while(min_c<=max){
            b.push(min_c)
            min_c++
        }
        while(min_2<NOP_val){
            a.push(min)
            min_2+=min 
        }
        while(a[0]<=max){
            for (const item of a) {
                NOP_val_2 += item;
            }
            if(a[a.length - 1]>max){
                a.pop()
                a[a.length - 1]++
            }
            else if (NOP_val_2==NOP_val){
                combo_space.innerHTML=a
                a.pop()
                a[a.length - 1]++
                c.push("L")
            }else if(NOP_val_2<NOP_val){
                a.push(a[a.length - 1])
            }else if(NOP_val_2>NOP_val){
                a.pop()
                a[a.length - 1]++
                dif=NOP_val_2-NOP_val
                m.push(dif)
            }
            NOP_val_2=0
            dif=0
        }
        if(c.length==0){
            let exult=Math.min(...m)
            extra_space.innerHTML = exult
            combo_space.innerHTML = "None"
        }
        if(c.length!=0){
            extra_space.innerHTML = 0
        }
        i++
    }
}
var table =document.getElementById("myTable")
var button = document.getElementById("downloadButton");
function erase(){
    window.location.reload()
}
