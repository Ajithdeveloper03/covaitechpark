<?php
/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║         CovaiTech Park — One-Click Deploy Script         ║
 * ║   Runs migrations + updates admin credentials in DB      ║
 * ║                                                          ║
 * ║  SECURITY: Protected by secret token in URL              ║
 * ║  DELETE THIS FILE from server after use!                 ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * Usage: https://covaitechpark.com/api/deploy-run.php?token=COVAITECH_DEPLOY_2026
 */

// ─── SECURITY TOKEN ──────────────────────────────────────────────────────────
// Change this if you want extra security, must match URL ?token= value
define('DEPLOY_TOKEN', 'COVAITECH_DEPLOY_2026');

// ─── BASIC PROTECTION ────────────────────────────────────────────────────────
header('Content-Type: text/html; charset=UTF-8');

if (!isset($_GET['token']) || $_GET['token'] !== DEPLOY_TOKEN) {
    http_response_code(403);
    die('<h2 style="color:red;font-family:monospace;">❌ Forbidden — Invalid or missing token.</h2>');
}

// ─── DOUBLE CONFIRM (POST required for destructive action) ───────────────────
$confirmed = isset($_POST['confirm']) && $_POST['confirm'] === 'YES_RUN_DEPLOY';

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CovaiTech Deploy Tool</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0f1a; color: #e2e8f0; font-family: 'Courier New', monospace; padding: 40px 20px; min-height: 100vh; }
  .container { max-width: 760px; margin: 0 auto; }
  h1 { color: #f37021; font-size: 22px; margin-bottom: 6px; }
  .subtitle { color: #64748b; font-size: 13px; margin-bottom: 32px; }
  .card { background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; margin-bottom: 20px; }
  .card h2 { font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
  .log { background: #0d1117; border-radius: 8px; padding: 16px; font-size: 13px; line-height: 2; }
  .ok   { color: #22c55e; }
  .err  { color: #ef4444; }
  .warn { color: #f59e0b; }
  .info { color: #60a5fa; }
  .dim  { color: #4b5563; }
  form { margin-top: 24px; }
  .btn { background: #f37021; color: white; border: none; padding: 14px 32px; border-radius: 8px; font-size: 14px; font-weight: bold; cursor: pointer; letter-spacing: 1px; }
  .btn:hover { background: #d55c14; }
  .btn-del { background: #dc2626; margin-left: 12px; }
  .warning-box { background: #7f1d1d22; border: 1px solid #ef444433; border-radius: 8px; padding: 16px; margin-bottom: 20px; color: #fca5a5; font-size: 13px; }
  .success-box { background: #14532d22; border: 1px solid #22c55e33; border-radius: 8px; padding: 16px; margin-bottom: 20px; color: #86efac; font-size: 13px; }
  hr { border: none; border-top: 1px solid #1f2937; margin: 20px 0; }
</style>
</head>
<body>
<div class="container">
  <h1>🚀 CovaiTech Park — Deploy Tool</h1>
  <p class="subtitle">One-click database migration + admin credential reset</p>

<?php if (!$confirmed): ?>

  <div class="warning-box">
    ⚠️ <strong>This will:</strong><br><br>
    1. Run all pending Laravel database migrations on the <strong>live Hostinger DB</strong><br>
    2. Update admin email to <strong>info@covaitechpark.com</strong><br>
    3. Update admin password to <strong>CovaiTechPark@2026</strong><br>
    4. Revoke all old login tokens (fresh login required)
  </div>

  <div class="card">
    <h2>Confirm Deployment</h2>
    <form method="POST" action="?token=<?= htmlspecialchars(DEPLOY_TOKEN) ?>">
      <input type="hidden" name="confirm" value="YES_RUN_DEPLOY">
      <button type="submit" class="btn">▶ Run Migration + Reset Admin</button>
    </form>
  </div>

<?php else: ?>

  <?php
  // ─── BOOTSTRAP LARAVEL ──────────────────────────────────────────────────
  $results  = [];
  $allOk    = true;

  try {
      require __DIR__ . '/../vendor/autoload.php';
      $app    = require_once __DIR__ . '/../bootstrap/app.php';
      $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
      $kernel->bootstrap();
      $results[] = ['ok', '✅ Laravel bootstrapped successfully'];
  } catch (Throwable $e) {
      $results[] = ['err', '❌ Laravel bootstrap failed: ' . $e->getMessage()];
      $allOk = false;
  }

  // ─── RUN MIGRATIONS ─────────────────────────────────────────────────────
  if ($allOk) {
      try {
          // Test DB connection first
          \Illuminate\Support\Facades\DB::connection()->getPdo();
          $results[] = ['ok', '✅ Database connection established'];

          // Run artisan migrate
          \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
          $output = \Illuminate\Support\Facades\Artisan::output();
          $lines  = array_filter(array_map('trim', explode("\n", $output)));

          foreach ($lines as $line) {
              if (empty($line)) continue;
              if (stripos($line, 'DONE') !== false || stripos($line, 'already') !== false) {
                  $results[] = ['ok', '  ✔ ' . $line];
              } elseif (stripos($line, 'ERROR') !== false || stripos($line, 'fail') !== false) {
                  $results[] = ['err', '  ✘ ' . $line];
                  $allOk = false;
              } else {
                  $results[] = ['info', '  › ' . $line];
              }
          }

          $results[] = ['ok', '✅ All migrations completed'];
      } catch (Throwable $e) {
          $results[] = ['err', '❌ Migration failed: ' . $e->getMessage()];
          $allOk = false;
      }
  }

  // ─── UPDATE ADMIN USER ──────────────────────────────────────────────────
  if ($allOk) {
      try {
          $user = \App\Models\User::whereIn('email', [
              'admin@covaitech.com',
              'info@covaitechpark.com',
          ])->first();

          if ($user) {
              $user->email    = 'info@covaitechpark.com';
              $user->name     = 'Admin User';
              $user->password = \Illuminate\Support\Facades\Hash::make('CovaiTechPark@2026');
              $user->save();

              // Revoke all old tokens
              $tokenCount = $user->tokens()->count();
              $user->tokens()->delete();

              $results[] = ['ok', '✅ Admin email updated → info@covaitechpark.com'];
              $results[] = ['ok', '✅ Admin password updated → CovaiTechPark@2026'];
              $results[] = ['ok', "✅ {$tokenCount} old token(s) revoked — fresh login required"];
          } else {
              // Create fresh admin
              \App\Models\User::create([
                  'name'     => 'Admin User',
                  'email'    => 'info@covaitechpark.com',
                  'password' => \Illuminate\Support\Facades\Hash::make('CovaiTechPark@2026'),
              ]);
              $results[] = ['ok', '✅ New admin user created — info@covaitechpark.com'];
          }
      } catch (Throwable $e) {
          $results[] = ['err', '❌ Admin update failed: ' . $e->getMessage()];
          $allOk = false;
      }
  }

  // ─── CLEAR CACHE ────────────────────────────────────────────────────────
  if ($allOk) {
      try {
          \Illuminate\Support\Facades\Artisan::call('config:clear');
          \Illuminate\Support\Facades\Artisan::call('cache:clear');
          $results[] = ['ok', '✅ Config & cache cleared'];
      } catch (Throwable $e) {
          $results[] = ['warn', '⚠️ Cache clear skipped: ' . $e->getMessage()];
      }
  }
  ?>

  <div class="<?= $allOk ? 'success-box' : 'warning-box' ?>">
    <?= $allOk
      ? '🎉 <strong>Deployment successful!</strong> You can now log in with the new credentials.'
      : '⚠️ <strong>Deployment completed with errors.</strong> Check the log below.' ?>
  </div>

  <div class="card">
    <h2>Deployment Log</h2>
    <div class="log">
      <?php foreach ($results as [$type, $msg]): ?>
        <div class="<?= $type ?>"><?= htmlspecialchars($msg) ?></div>
      <?php endforeach; ?>
      <hr>
      <div class="dim">Completed at: <?= date('Y-m-d H:i:s T') ?></div>
    </div>
  </div>

  <?php if ($allOk): ?>
  <div class="card">
    <h2>✅ New Login Credentials</h2>
    <div class="log">
      <div class="ok">Email    : info@covaitechpark.com</div>
      <div class="ok">Password : CovaiTechPark@2026</div>
      <div class="ok">URL      : https://covaitechpark.com/admin/login</div>
    </div>
  </div>

  <div class="card">
    <h2>⚠️ Security — Delete This File Now</h2>
    <div class="log">
      <div class="warn">This script has access to your database. Delete it immediately!</div>
      <div class="warn">File path on server: public/deploy-run.php</div>
    </div>
    <form method="POST" action="?token=<?= htmlspecialchars(DEPLOY_TOKEN) ?>" style="margin-top:16px;">
      <input type="hidden" name="confirm" value="YES_RUN_DEPLOY">
      <input type="hidden" name="self_delete" value="1">
      <button type="submit" class="btn btn-del" onclick="return confirm('Delete this deploy script from the server?')">🗑 Self-Delete This File</button>
    </form>
  </div>
  <?php endif; ?>

<?php endif; ?>

<?php
// Self-delete if requested
if (isset($_POST['self_delete']) && $_POST['self_delete'] === '1' && $confirmed) {
    if (@unlink(__FILE__)) {
        echo '<div class="success-box">🗑 Script deleted successfully. You are safe!</div>';
    } else {
        echo '<div class="warning-box">⚠️ Could not auto-delete. Please manually delete: <strong>public/deploy-run.php</strong></div>';
    }
}
?>

</div>
</body>
</html>
