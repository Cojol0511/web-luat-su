  $(document).ready(function() {
      var table = new DataTable("table",{
          

          // how many rows per page
          perPage: 5,
          perPageSelect: [5,10,15,20,25],

          fixedColumns: true,
          fixedHeight: false,

          // Pagination
          nextPrev: true,
          firstLast: false,
          prevText: "&lsaquo;",
          nextText: "&rsaquo;",
          firstText: "&laquo;",
          lastText: "&raquo;",
          ellipsisText: "&hellip;",
          ascText: "▴",
          descText: "▾",
          truncatePager: true,
          pagerDelta: 2,

          // enables sorting
          sortable: true,

          // enables live search
          searchable: true,

          header: true,
          footer: false,

          // Customise the display text
          labels: {
              placeholder: "Tìm kiếm...", // The search input placeholder
              perPage: "Hiển thị {select} danh mục", // per-page dropdown label
              noRows: "Không tìm thấy danh mục", // Message shown when there are no search results
              info: "Danh mục {start}-{end} / {rows}" //
          },

          // Customise the layout
          layout: {
              top: "{select}{search}",
              bottom: "{info}{pager}"
          }
      });
  } );