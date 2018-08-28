<template>
  <section class="user">
    <c-grid>
      <c-grid-inner>
        <c-grid-cell
          :span-desktop="4"
          :span-phone="12"
          :span-tablet="12">
        </c-grid-cell>
          <div class="user-details">Profile</div>
        <c-grid-cell
          :span-desktop="8"
          :span-phone="12"
          :span-tablet="12">
        </c-grid-cell>
          <div class="user-activity">Activity</div>
      </c-grid-inner>
    </c-grid>
  </section>
</template>

<script>
import CGrid from '@/components/grid/Grid'
import CGridInner from '@/components/grid/GridInner'
import CGridCell from '@/components/grid/GridCell'

export default {
  name: 'Profile',
  components: {
    CGrid,
    CGridInner,
    CGridCell
  },
}
</script>
