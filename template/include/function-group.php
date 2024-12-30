<!-- NOTE : FUNCTION GROUP -->

<?php
if (isset($section_cover) && !empty($section_cover)) {
    $section_cover_m = isset($section_cover_m) && !empty($section_cover_m) ? $section_cover_m : $section_cover;

    $isImageCover = preg_match("/\.(jpg|png)$/", $section_cover);
    $isImageCoverM = preg_match("/\.(jpg|png)$/", $section_cover_m);

    $isVideoCover = preg_match("/\.(mp4)$/", $section_cover);
    $isVideoCoverM = preg_match("/\.(mp4)$/", $section_cover_m);

    if ($isImageCover && $isImageCoverM) { ?>
        <picture class="object-fit">
            <source media="(min-width:992px)" srcset="<?php echo $section_cover; ?>">
            <source media="(min-width:0px)" srcset="<?php echo $section_cover_m; ?>">
            <img src="<?php echo $section_cover; ?>" alt="">
        </picture>
    <?php
    } elseif ($isVideoCover && $isVideoCoverM) { ?>
        <figure class="object-fit">
            <video playsinline autoplay muted loop src="" class="vdojs" data-vdo-src="<?php echo $section_cover; ?>" data-vdo-srcset="<?php echo $section_cover_m; ?>"></video>
        </figure>
    <?php
    } else { ?>
        <figure class="object-fit hidden-device-sm">
            <?php if ($isVideoCover) { ?>
                <video playsinline autoplay muted loop src="<?php echo $section_cover; ?>"></video>
            <?php } else { ?>
                <img src="<?php echo $section_cover; ?>" alt="">
            <?php } ?>
        </figure>

        <figure class="object-fit visible-device-sm">
            <?php if ($isVideoCoverM) { ?>
                <video playsinline autoplay muted loop src="<?php echo $section_cover_m; ?>"></video>
            <?php } else { ?>
                <img src="<?php echo $section_cover_m; ?>" alt="">
            <?php } ?>
        </figure>
<?php
    }
} else {
    echo 'No media available.';
}
?>