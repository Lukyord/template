<div class="cky-consent-container cky-banner-bottom">
    <div class="cky-consent-bar" data-cky-tag="notice" style="background-color:#FFFFFF;border-color:#f4f4f4;">
        <div class="cky-notice">
            <!-- <p class="cky-title" data-cky-tag="title" style="color:#212121;">Cookie</p> -->
            <div class="cky-notice-group">
                <div class="cky-notice-des" data-cky-tag="description" style="color:#212121;">
                    <p>This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies. Review our cookies information for <a class="cky-policy" href="<?php echo $root; ?>page.php">more details</a>.</p>
                </div>
                <div class="cky-notice-btn-wrapper" data-cky-tag="notice-buttons">
                    <button class="cky-btn cky-btn-customize" aria-label="Customize" data-cky-tag="settings-button" style="color:#1863dc;background-color:transparent;border-color:#1863dc;">Cookie Settings</button>
                    <button class="cky-btn cky-btn-reject" aria-label="Reject All" data-cky-tag="reject-button" style="color:#1863dc;background-color:transparent;border-color:#1863dc;">Decline</button>
                    <button class="cky-btn cky-btn-accept" aria-label="Accept All" data-cky-tag="accept-button" style="color:#FFFFFF;background-color:#1863dc;border-color:#1863dc;">Accept</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        jQuery(function($){
            $('.cky-consent-container .cky-btn').click(function(e){
                e.preventDefault();
                $('.cky-consent-container').fadeOut(200);
            });
        });
    </script>
</div>