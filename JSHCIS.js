function Inputing() {
     if (window.history.replaceState) {
          window.history.replaceState(null, null, window.location.href);
     }
     const inputPosisi = document.querySelector('#posisi')
     const valPosisi = document.querySelectorAll('select.posisi option')
     const selecPosisi = document.getElementById('selectposisi')
     const posisi = []
     valPosisi.forEach(elem => posisi.push({
          valus: elem.value,
          display: elem.innerHTML
     }));
     console.log(posisi)
     inputPosisi.addEventListener('keyup', function(e) {
          const opsi = posisi.filter(elems => elems.display.toLowerCase().indexOf(this.value.toLowerCase()) > -1)
          let html = ''
          opsi.forEach(elems => html += createOption(elems))
          selecPosisi.innerHTML = html
          console.log(html);
     })

     function createOption(elems) {
          let jsx = `<option value="${elems.valus}">${elems.display}</option>`
          return jsx
     }

     function generatePendidikanOption(elems) {
          let jsx = `<option data-id="${ elems . id}" data-jenjang="${ elems . jenjang}" data-rumpun="${ elems . rumpun}" data-subrumpun="${ elems . subrumpun}">${ elems . rumpun} - ${elems . subrumpun}</option>`
          return jsx
     }

     selecPosisi.addEventListener('click', function(e) {
          if (e.target.tagName == 'OPTION') {
               document.getElementById('posisi').value = e.target.innerHTML
               this.innerHTML = ''
          } else {
               e.stopPropagation
          }
     })

     // js Pendidikan

     const valPendidikan = document.querySelectorAll('#alloption option')
     const inputPendidikan = document.getElementById('selectpendidikan')
     const jenjang = document.getElementById('pendidikan')
     const jurusan = document.getElementById('jurusan')

     const pendidikan = []
     valPendidikan.forEach(elem => pendidikan.push({
          'id': elem.getAttribute('data-id'),
          'jenjang': elem.getAttribute('data-jenjang'),
          'rumpun': elem.getAttribute('data-rumpun'),
          'subrumpun': elem.getAttribute('data-subrumpun'),
     }))


     document.getElementById('alloption').innerHTML = fillTheOption(pendidikan)

     function fillTheOption(alpah) {
          let option = ''
          alpah.forEach(el => option += generatePendidikanOption(el))
          return option
     }

     jenjang.addEventListener('change', function(e) {
          const varBaru = whenFilled(e.target.value, jurusan.value)
          document.getElementById('sugestionopt').innerHTML = fillTheOption(varBaru)
     })

     function funPendidikan(params) {
          if (params == 'SD' || params == 'SMP' || params == 'SMA' || params == 'SMK') {
               const filterPendidikan = pendidikan.filter(elems => elems.jenjang.indexOf(params) > -1);
               return filterPendidikan
          } else {
               const filterPendidikan = pendidikan.filter(elems => elems.jenjang.indexOf('PT') > -1);
               return filterPendidikan
          }
     }

     function whenFilled(jenjang, input = null) {
          const valSearch = input
          const varSearch = valSearch.split(" ")
          const filteredPendidikan = funPendidikan(jenjang)
          const storedId = []
          varSearch.forEach(values => {
               let filterval = filteredPendidikan.filter(elems => elems.subrumpun.toLowerCase().indexOf(values.toLowerCase()) > -1)
               filterval.forEach(elems => storedId.push(elems))
          })
          let varBaru = storedId.filter(function(elem, index, self) {
               return index === self.indexOf(elem)
          })

          varBaru.forEach(vall => {
               let x = filteredPendidikan.indexOf(vall)
               if (x > -1) {
                    filteredPendidikan.splice(x, 1)
               }
          })

          document.getElementById('alloption').innerHTML = fillTheOption(filteredPendidikan)
          return varBaru
     }


     jurusan.addEventListener('keyup', function(e) {
          const varBaru = whenFilled(jenjang.value, e.target.value)
          document.getElementById('sugestionopt').innerHTML = fillTheOption(varBaru)

     })

     inputPendidikan.addEventListener('click', function(e) {
          if (e.target.tagName == 'OPTION') {
               document.getElementById('Tag').value = e.target.innerHTML
               document.getElementById('id_rumpun').value = e.target.getAttribute('data-id')
          }
     })

     // js pengalaman
     const pengalamanKerja = document.getElementById('pengalaman')

     pengalamanKerja.addEventListener('keypress', function(e) {
          if (e.keyCode === 13) {
               const valItem = e.target.value
               const varItem = valItem.split(";")
               const createTable = tbpengalamanKerja(varItem)
               document.getElementById('tbodypengalaman').insertAdjacentHTML('beforeend', createTable)
               this.value = ''
          }
     })

     document.getElementById('tbodypengalaman').addEventListener('click', function(e) {
          if (e.target.classList.contains('remove')) {
               e.target.parentNode.parentNode.remove()
          }
     })

     function tbpengalamanKerja(params) {
          let x = `<tr>`
          x += `<td><input name='col1[]' style='border:0;outline:0;display:inline-block;width:100%;' value='${params[0]}'></td>`
          x += `<td><input name='col2[]' style='border:0;outline:0;display:inline-block;width:100%;' value='${params[1]}'></td>`
          x += `<td style="text-align:center;"><a class="btn btn-sm btn-danger remove bi bi-trash" href="#" role="button"></a></td>`
          x += `<tr>`
          return x
     }

     // js skill
     const skilltalenta = document.getElementById('skill')

     skilltalenta.addEventListener('keypress', function(e) {
          if (e.keyCode === 13) {
               const varItem = e.target.value
               const createTable = tbskilltalenta(varItem)
               document.getElementById('tbodyskill').insertAdjacentHTML('beforeend', createTable)
               this.value = ''
          }
     })

     document.getElementById('tbodyskill').addEventListener('click', function(e) {
          if (e.target.classList.contains('remove')) {
               e.target.parentNode.parentNode.remove()
          }
     })

     function tbskilltalenta(params) {
          let x = `<tr>`
          x += `<td><input name='skill[]' style='border:0;outline:0;display:inline-block;width:100%;' value='${params}'></td>`
          x += `<td style="text-align:center;"><a class="btn btn-sm btn-danger remove bi bi-trash" href="#" role="button"></a></td>`
          x += `<tr>`
          return x
     }

     // submiting create
     document.getElementById('submit').addEventListener('click', function() {
          document.getElementById('create').submit()
     })




     // document.getElementById('selectpendidikan').addEventListener('scroll', function(e) {
     //      var as = e.target.scrollHeight
     //      var as1 = e.target.scrollTop
     //      var as2 = e.target.offsetHeight
     //      var as3 = as - as2
     //      if (as3 <= as1) {
     //           setTimeout(() => {
     //                console.log('dibawah')
     //           }, 300);
     //      } else {
     //           e.stopPropagation
     //      }
     // })


     // kelengkapan dokumen
     const dokumen = document.getElementById('dokumen')
     const valDokumen = dokumen.value.split(",")
     console.log(valDokumen);
     const cekDokumen = document.querySelectorAll('.dokumen')
     cekDokumen.forEach(event => {
          event.addEventListener('change', function(e) {
               if (e.target.checked == false) {
                    const valIndex = valDokumen.indexOf(e.target.value)
                    valDokumen.splice(valIndex, 1);
                    console.log(valDokumen);
                    dokumen.value = valDokumen
               }
               if (e.target.checked == true) {
                    valDokumen.splice(0, 0, e.target.value);
                    console.log(valDokumen);
                    dokumen.value = valDokumen
               }
          })
     })


     // formskill
     const checkSkill = document.querySelectorAll('.formskill')
     const inputskill = document.getElementById('skilltalent')
     const skillval = []

     checkSkill.forEach(elem => {
          elem.addEventListener('change', function(e) {
               if (e.target.checked === true) {
                    skillval.push(e.target.value)
                    inputskill.value = skillval
               } else {
                    const indexSkill = skillval.indexOf(e.target.value)
                    skillval.splice(indexSkill, 1);
                    inputskill.value = skillval
               }
          })
     })
}
